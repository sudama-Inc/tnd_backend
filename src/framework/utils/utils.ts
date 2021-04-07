"use strict";

import moment from "moment-timezone";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import httpStatus from "http-status-codes";
import _ from "underscore";

const s3 = new aws.S3({});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, global["__basedir"] + "/../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = () => {
  return multer({ storage });
};

export const uploadS3 = (bucket: string, folder: string, fileFilter) => {
  return multer({
    fileFilter,
    storage: multerS3({
      s3: s3,
      bucket,
      metadata: function (req, file, cb) {
        cb(null, {
          fieldName: file.fieldname,
          uploaded_by_id: `${req.user.id}`,
        });
      },
      key: function (req, file, cb) {
        cb(null, `${folder.toLowerCase()}/${Date.now()}_${file.originalname}`);
      },
    }),
  });
};

export const fileTypeMulterFilter = (validExtensions: string[]) => {
  return (req, file, cb) => {
    if (validExtensions.length > 0) {
      const extn = file.originalname.split(".").pop();
      const isValid = validExtensions.find((validEx) => validEx === extn)
        ? true
        : false;
      if (isValid) {
        cb(null, true);
      } else {
        cb(
          `Not a valid file type. Allowed file type are ${validExtensions.join(
            ", "
          )}`,
          isValid
        );
      }
    }
  };
};

export const getCurrentDateTime = (format = "x") => moment().format(format);

export const formatDateTime = (timestamp, inFormat, outFormat = "x") =>
  moment(timestamp, inFormat).format(outFormat);

export const getCustomError = (message: string, statusCode: number) => {
  const error = new Error(message);
  error["statusCode"] = statusCode;
  return error;
};

export const parseNumber = (value: string, fieldName: string): number => {
  if (value) {
    if (isNaN(Number(value))) {
      throw getCustomError(
        `${fieldName} should be of type number`,
        httpStatus.BAD_REQUEST
      );
    }
    return Number(value);
  }
  return 0;
};

export const parseBoolean = (value: string, fieldName: string): boolean => {
  if (value) {
    if (typeof value === "boolean") {
      return value;
    }
    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    }
    throw getCustomError(
      `${fieldName} should be of type true/false`,
      httpStatus.BAD_REQUEST
    );
  }
  return false;
};

export const isValidArrayItem = (
  validSortColumns = [],
  value,
  fieldName: string
) => {
  const isValidColumn = validSortColumns.some(
    (validColumn) => validColumn === value
  );
  if (!isValidColumn) {
    throw getCustomError(
      `Invalid value for ${fieldName}. Allowed values are ${validSortColumns.join(
        ", "
      )}`,
      httpStatus.BAD_REQUEST
    );
  }
};

export const getReadStreamS3 = (key: string, bucket: string) => {
  const s3Params = {
    Bucket: bucket,
    Key: key,
  };
  return s3.getObject(s3Params).createReadStream();
};

export const getHeadObject = async (bucket: string, key: string) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  return new Promise((resolve, reject) => {
    s3.headObject(params, function (err, metadata) {
      if (err && err.code === "NotFound") {
        reject(
          getCustomError(
            `Generating PreSigned Url Failed :(${err})`,
            httpStatus.NOT_FOUND
          )
        );
      } else {
        resolve(metadata);
      }
    });
  });
};

export const getSignedUrl = (bucket: string, key: string, expires: number) => {
  var param = { Bucket: bucket, Key: key, Expires: expires };
  return new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", param, (err, url) => {
      err
        ? reject(
            getCustomError(
              `Generating PreSigned Url Failed :(${err})`,
              httpStatus.INTERNAL_SERVER_ERROR
            )
          )
        : resolve({ url: url });
    });
  });
};

export const retry = async (
  fn_promise,
  options,
  maxTries,
  promise,
  promiseObject
) => {
  maxTries--;
  promiseObject = promiseObject || {
    resolve: null,
    reject: null,
  };

  promise =
    promise ||
    new Promise((resolve, reject) => {
      promiseObject.resolve = resolve;
      promiseObject.reject = reject;
    });

  fn_promise(options)
    .then((result) => {
      promiseObject.resolve(result);
    })
    .catch((err) => {
      setTimeout(() => {
        if (maxTries > 0) {
          // reject('maximum retries exceeded');
          retry(fn_promise, options, maxTries, promise, promiseObject)
            .then((msg) => {
              return promiseObject.resolve(msg);
            })
            .catch((err) => {
              return promiseObject.reject(err);
            });
        } else {
          promiseObject.reject(err);
        }
      }, 10000);
    });
  return promise;
};

export const parseFilterRequest = (req) => {
  const FILTER_LIMIT = 10;
  const FILTER_MAX_LIMIT = 100;

  if ("filter" in req.body) {
    req.body.filter["q"] = req.body.filter.q || "";
    req.body.filter["exhaustive"] =
      parseBoolean(req.body.filter.exhaustive, "exhaustive") || false;
  } else {
    req.body["filter"] = { q: "", exhaustive: false };
  }

  // parse limit from request object
  if ("page" in req.body) {
    var limit = parseNumber(req.body.page.limit, "limit") || FILTER_LIMIT;
    var offset = parseNumber(req.body.page.offset, "offset") || 0;
  } else {
    var limit = FILTER_LIMIT;
    var offset = 0;
  }

  if (limit > FILTER_MAX_LIMIT) {
    throw getCustomError(
      `max limit is ${FILTER_MAX_LIMIT}`,
      httpStatus.BAD_REQUEST
    );
  }

  offset = offset < 0 ? 0 : offset;

  return {
    filter: req.body.filter,
    sort: req.body.sort,
    page: { limit, offset },
  };
};

export const isTodayOrPastDate = (date: string): boolean => {
  const a = moment(date).tz("Asia/Kolkata").endOf("day");
  const b = moment(moment()).tz("Asia/Kolkata").endOf("day");
  return b >= a;
};

export const isTodayOrFutureDate = (date: string): boolean => {
  const a = moment(date).tz("Asia/Kolkata").endOf("day");
  const b = moment(moment()).tz("Asia/Kolkata").endOf("day");
  return b <= a;
};

// export const hasPermissionFor = (req, groupNames: string[]): boolean => {
//   const user: AuthUser = req.user;
//   if (user.is_superuser) {
//     return true;
//   }
//   const userGroups: string[] = _.pluck(user.auth_groups, "name");
//   const common: string[] = _.intersection(userGroups, groupNames);
//   if (common.length) {
//     return true;
//   }
//   return false;
// };

export const localCompare = (string1: string, string2: string) =>
  new String(string1).localeCompare(string2, "en", { sensitivity: "base" }) ===
  0
    ? true
    : false;

export function columnToLetter(column) {
  var temp,
    letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

export function letterToColumn(letter) {
  var column = 0,
    length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

export const validateSortDirection = (sort) => {
  if (sort.sort_direction) {
    const validSortDirections = ["DESC", "ASC"];
    isValidArrayItem(
      validSortDirections,
      sort.sort_direction,
      "sort_direction"
    );
  }
};

export const prepareIncludeArray = (include_from_body: any[]) => {
  if (include_from_body.length) {
    return _.map(include_from_body, (i) => {
      try {
        const m = require(`../../models/${i.model}`);
        const obj = {
          model: m.default,
          attributes: i.attributes || null,
          include: [],
        };
        if (_.has(i, "include") && i.include.length) {
          obj.include = prepareIncludeArray(i.include);
        }
        return obj;
      } catch (e) {
        throw getCustomError("invalid model value", httpStatus.BAD_REQUEST);
      }
    });
  } else {
    return [];
  }
};

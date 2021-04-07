"use strict";

import httpStatus from "http-status-codes";
import _ from "underscore";
import Sequelize from "sequelize";
import moment from "moment-timezone";

import { getCustomError, isTodayOrPastDate } from "../../framework/utils/utils";

//////\\\\\
// WARNING \\
////////\\\\\\\
// IF YOU ARE USING THE FUNCTIONS BELOW MAKE SURE TO FOLLOW APPROPRIATE ORDER FOR CALLING
// USING THESE IN DIFFERENT ORDER DO NOT GUARANTEE THAT ALL OF THE CODES BELONG TO EACH OTHER!

export const validateQty = (qty) => {
  // check if number is an integer
  if (!Number.isInteger(qty)) {
    throw getCustomError(
      "Quantity must be a valid integer",
      httpStatus.BAD_REQUEST
    );
    // check if positive integer
  } else if (qty < 1) {
    throw getCustomError(
      "Quantity must be greater than 0",
      httpStatus.BAD_REQUEST
    );
  }
};

export const validateArrayOfIds = async (array_ids, ModelDataAccess) => {
  // a list to capture all the invalid array_ids
  var invalid_array_ids = [];
  // a list of array_ids has been given
  array_ids = array_ids.filter(onlyUnique);
  const model_data = await ModelDataAccess.findAllWhere({ id: array_ids });
  invalid_array_ids = _.difference(
    array_ids,
    _.pluck(JSON.parse(JSON.stringify(model_data)), "id")
  );
  // check if there are any array_ids in invalid list
  if (invalid_array_ids.length > 0) {
    throw getCustomError(
      `Some of the ${
        ModelDataAccess.name.split("DataAccess")[0]
      } Ids you have given are invalid: ${invalid_array_ids}`,
      httpStatus.BAD_REQUEST
    );
  }
  // return validated list
  return array_ids;
};

export const createSearchableWhereFilter = (filter) => {
  var filter_response = {};
  // create query with filter
  if (filter) {
    if ("q" in filter && "fields" in filter) {
      filter_response[Sequelize.Op.or] = filter.fields.map((field) => {
        var obj = {};
        obj[field] = { [Sequelize.Op.like]: filter.q };
        return obj;
      });
    }
  }
  // return the filter object
  return filter_response;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const validateDate = (date_item, item_name = "date") => {
  if (!date_item) {
    throw getCustomError(`${item_name} is required`, httpStatus.BAD_REQUEST);
  }
  if (new Date(date_item).toString() === "Invalid Date") {
    throw getCustomError(
      `Please enter a valid date format for ${item_name}`,
      httpStatus.BAD_REQUEST
    );
  }
  if (!isTodayOrPastDate(date_item) && item_name !== "exp_date") {
    throw getCustomError(
      `Please enter today or past date for ${item_name}`,
      httpStatus.BAD_REQUEST
    );
  }
};

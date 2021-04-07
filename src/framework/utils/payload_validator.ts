"use strict";

import Ajv from "ajv";

const ajValidator = new Ajv({
  allErrors: true
});

export default schema => {
  return (req) => {
    try {
      const validate = ajValidator.compile(schema);
      const result = validate(req.body);
      if (!result) {
        const errors = parseErrors(validate.errors);
        return {
          result,
          errors
        }
      } else {
        return {
          result,
          errors: []
        }
      }
    } catch (e) {
      console.log(e);
      return {
        result: false,
        errors: []
      }
    }
  };
};

const parseErrors = validationErrors => {
  return validationErrors.map(error => {
    console.log(error);
    return {
      param: error.params["missingProperty"],
      key: error.keyword,
      property:  error.dataPath,
      message: error.keyword === "required" ? error.message : `${error.dataPath} ${error.message}`,
      allowedValues: error.keyword === "enum" ? error.params.allowedValues : undefined
    };
  });
};


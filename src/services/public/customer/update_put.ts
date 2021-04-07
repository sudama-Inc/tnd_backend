"use strict";
import _ from "underscore";
import httpStatus from "http-status-codes";

import { getCustomError } from "../../../framework/utils/utils";
import payload_validator from "../../../framework/utils/payload_validator";
import { sequelize } from "../../../framework/database_connection";

import CustomerDataAccess from "../../../data_access/customers";

export const execute = async (req) => {
  const { result, errors } = payload_validator(
    require("../../../../../schemas/customer/update.json")
  )(req);
  if (!result) {
    const error = getCustomError("Validation Error", httpStatus.BAD_REQUEST);
    error["details"] = errors;
    throw error;
  }

  const { body } = req;
  const id = await validateCustomerId(body.id);
  const customer = {
    name: body.name,
    nick_name: body.nick_name,
    age: body.age,
    mobile: body.mobile,
    address: body.address,
    education: body.education,
    occupation: body.occupation,
    salary: body.salary,
    hobbies: body.hobbies,
  };
  sequelize.transaction(async (transaction) => {
    return CustomerDataAccess.update(customer, { id: id }, transaction);
  });

  return await CustomerDataAccess.findOneWhere({ id });
};

const validateCustomerId = async (id) => {
  const validcustomer = await CustomerDataAccess.findOneWhere({ id: id });
  if (!validcustomer) {
    throw getCustomError(
      "Customer Id can not be exit in database",
      httpStatus.BAD_REQUEST
    );
  } else {
    return validcustomer.id;
  }
};

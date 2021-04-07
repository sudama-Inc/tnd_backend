"use strict";
import _ from "underscore";
import httpStatus from "http-status-codes";
import { getCustomError } from "../../../framework/utils/utils";
import CustomerDataAccess from "../../../data_access/customers";
import payload_validator from "../../../framework/utils/payload_validator";
import { sequelize } from "../../../framework/database_connection";

export const execute = async (req) => {
  const { result, errors } = payload_validator(
    require("../../../../../schemas/customer/create.json")
  )(req);
  if (!result) {
    const error = getCustomError("Validation Error", httpStatus.BAD_REQUEST);
    error["details"] = errors;
    throw error;
  }
  const { body } = req;
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
  return sequelize.transaction(async (transaction) => {
    return await CustomerDataAccess.create(customer, transaction);
  });
};

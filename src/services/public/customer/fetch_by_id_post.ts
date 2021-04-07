"use strict";
import _ from "underscore";
import httpStatus from "http-status-codes";
import { getCustomError } from "../../../framework/utils/utils";

import CustomerDataAccess from "../../../data_access/customers";

export const execute = async (req) => {
  const { id } = req.body;
  if (!id) {
    throw getCustomError("id is required", httpStatus.BAD_REQUEST);
  }
  return CustomerDataAccess.findOne({
    where: {
      id,
    },
  });
};

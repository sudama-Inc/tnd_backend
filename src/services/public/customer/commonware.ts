"use strict";
import _ from "underscore";
import httpStatus from "http-status-codes";

import { getCustomError } from "../../../framework/utils/utils";
import payload_validator from "../../../framework/utils/payload_validator";
import { createSearchableWhereFilter } from "../../../framework/utils/validation_utils";

import CustomerDataAccess from "../../../data_access/customers";

export const validateFilterRequest = async (req) => {
  // validate with payload validator
  const { result, errors } = payload_validator(
    require("../../../../../schemas/customer/filter.json")
  )(req);
  // if not result throw error
  if (!result) {
    const error = getCustomError("Validation Error", httpStatus.BAD_REQUEST);
    error["details"] = errors;
    throw error;
  }
  // lets check if sort and page are present
  var { filter, sort, page } = req.body;

  // FILTER VALIDATION //
  if (filter) {
    // correct q format for sql query
    if ("q" in filter) {
      filter["q"] = filter["q"].replace(/\*/g, "%");
    }
  }

  // SORT VALIDATION //
  if (!sort) {
    sort = { sort_column: "updated_at", sort_direction: "DESC" };
  }

  // PAGE VALIDATION //
  if (!page) {
    page = { limit: 10, offset: 0 };
  }

  // return validated filter sort and page
  return { filter, sort, page };
};

export const fetchCustomersWithFilter = async (validated_req_body) => {
  const { filter, sort, page } = validated_req_body;
  let customers = await CustomerDataAccess.findPaginated(
    createSearchableWhereFilter(filter),
    [],
    page.limit,
    page.offset,
    sort.sort_column,
    sort.sort_direction
  );
  return JSON.parse(JSON.stringify(customers));
};

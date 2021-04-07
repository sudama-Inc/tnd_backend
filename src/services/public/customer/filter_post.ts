"use strict";

import { fetchCustomersWithFilter, validateFilterRequest } from "./commonware";

export const execute = async (req) => {
  return await fetchCustomersWithFilter(await validateFilterRequest(req));
};

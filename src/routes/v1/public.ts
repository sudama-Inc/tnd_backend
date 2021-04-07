"use strict";

import express, { Express, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { validateRoute } from "../../middlewares/validate_route";
import { API_BASE_URL } from "../../settings/consts";

const router = express.Router();

const publicRoutes = (app: Express) => {
  router.use(validateRoute, async (req: Request, res: Response, next) => {
    try {
      if (req["servicePath"] && req["routeType"] === "public") {
        console.log(req["servicePath"]);
        const data = await require(req["servicePath"]).execute(req);
        return res.status(httpStatus.OK).json({ success: true, data });
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      return res
        .status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: e.statusCode ? e.message : "Something went wrong",
          errors: e,
        });
    }
  });
  app.use(API_BASE_URL, router);
};

export { publicRoutes };

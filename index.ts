"use strict";

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJs from "swagger-jsdoc";
import fs from "fs";
import _ from "underscore";

import { sequelize } from "./src/framework/database_connection";
require("./src/settings/env");
const pack = require("./package.json");
//const es_client = require('./src/framework/elasticsearch_client');
import { APP_PORT, APP_HOST, API_BASE_URL } from "./src/settings/consts";

import { publicRoutes } from "./src/routes/v1/public";
// import { customRoutes } from "./src/routes/v1/custom";

global["__basedir"] = __dirname;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(APP_PORT, function () {
  console.log(`server running at port ${APP_PORT}`);
  const swaggerDefinition = require("./swagger.json");
  swaggerDefinition.version = pack.version;
  swaggerDefinition.host = APP_HOST;
  swaggerDefinition.basePath = API_BASE_URL;
  const options = {
    swaggerDefinition,
    apis: ["swaggers/**/*.yaml"],
  };
  const swaggerSpec = swaggerJs(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
});

// don't alter these sequence of routes
publicRoutes(app);

// register models
const fileNames = fs.readdirSync(`${__dirname}/src/models`);
_.each(fileNames, (filenName) => {
  require(`${__dirname}/src/models/${filenName}`);
});

app.get("/api/version", async (req, res) => {
  return res.status(200).json({ version: pack.version });
});

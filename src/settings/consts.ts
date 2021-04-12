"use strict";

const getEnv = (varibleName: string) => {
  if (!process.env[varibleName]) {
    const errMsg = `Invalid environment variable - "${varibleName}"`;
    throw new Error(errMsg);
  }
  return process.env[varibleName];
};

const DATABASE = {
  NAME: getEnv("SQL_DB_NAME"),
  USER: getEnv("SQL_DB_USERNAME"),
  PASS: getEnv("SQL_DB_PASSWORD"),
  HOST: getEnv("SQL_DB_HOST"),
};

console.log(DATABASE);

const DIALECT = "mysql";

const DEBUG = getEnv("DEBUG");

const JWT = {
  KEY: getEnv("JWT_KEY"),
  ACCESS_EXPIRES: getEnv("ACCESS_JWT_EXPIRES"),
  REFRESH_EXPIRES: getEnv("REFRESH_JWT_EXPIRES"),
};

const APP_PORT = +getEnv("APP_PORT");

const APP_HOST = getEnv("APP_HOST");

const JOB_BUCKET = getEnv("JOB_BUCKET");

const API_BASE_URL = "/api/v1";

const DEFAULT_EMAIL_SENDER_FROM_FIELD = "1krishna.sudama@gmail.com>";

const SMTP_CONFIG = {
  SMTP_HOST: getEnv("SMTP_HOST"),
  SMPT_PORT: getEnv("SMTP_PORT"),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASS: getEnv("SMTP_PASS"),
};

const S3_ERRORS = {
  NoSuchBucket: "The specified bucket does not exist",
  NoSuchKey: "The specified key does not exist.",
};

const SERVER_TYPE = getEnv("SERVER_TYPE");

export {
  DATABASE,
  DEBUG,
  DIALECT,
  JWT,
  APP_PORT,
  JOB_BUCKET,
  API_BASE_URL,
  APP_HOST,
  DEFAULT_EMAIL_SENDER_FROM_FIELD,
  SMTP_CONFIG,
  S3_ERRORS,
  SERVER_TYPE,
};

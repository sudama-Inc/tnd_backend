"use strict";

process.env.SQL_DB_NAME = "tndbackend";
process.env.SQL_DB_USERNAME = "root";
process.env.SQL_DB_PASSWORD = "root";
process.env.SQL_DB_HOST = "localhost";

process.env.DEBUG = process.env.DEBUG || "true";

process.env.JWT_KEY =
  process.env.JWT_KEY ||
  "b&#r9ap@b&mpv+0v4f-ayyq9#r+%mwfx#(dog2!-w&40tay!%tou!9ap-v#(dog2!-@+%mou&40v98";
process.env.ACCESS_JWT_EXPIRES = process.env.ACCESS_JWT_EXPIRES || "24h";
process.env.REFRESH_JWT_EXPIRES = process.env.REFRESH_JWT_EXPIRES || "48h";

process.env.SEVEN_ELEVEN_USERNAME =
  process.env.SEVEN_ELEVEN_USERNAME || "7Eleven";
process.env.SEVEN_ELEVEN_PASS =
  process.env.SEVEN_ELEVEN_PASS || "D@nny73l3v3n%232602";
process.env.SEVEN_ELEVEN_CLIENT_ID =
  process.env.SEVEN_ELEVEN_CLIENT_ID || "fgapigateway";
process.env.SEVEN_ELEVEN_BASE_URL =
  process.env.SEVEN_ELEVEN_BASE_URL || "https://mapi.futuregroup.in";
process.env.SEVEN_ELEVEN_API_KEY =
  process.env.SEVEN_ELEVEN_API_KEY || "ea02f3c0-b937-470c-aef1-161897d57d1a";

process.env.SEVEN_ELEVEN_CLIENT_ID_DATABASE =
  process.env.SEVEN_ELEVEN_CLIENT_ID_DATABASE || "15";

process.env.APP_PORT = process.env.APP_PORT || "8000";
process.env.APP_HOST =
  process.env.APP_HOST || `localhost:${process.env.APP_PORT}`;
process.env.SMTP_PORT = process.env.SMTP_PORT || "465";
process.env.SMTP_USER = process.env.SMTP_USER || "AKIA6KYHHOAUDEHYNB3A";
process.env.SMTP_PASS =
  process.env.SMTP_PASS || "BJ4dy5PYqdUrHFF4u97VFruXn+XlB1FLmdsduHFTduSx";
process.env.SMTP_HOST =
  process.env.SMTP_HOST || "email-smtp.ap-south-1.amazonaws.com";
process.env.JOB_BUCKET = process.env.JOB_BUCKET || "tndbackend-bucket";

process.env.SERVER_TYPE = process.env.SERVER_TYPE || "dev_local";

"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../framework/database_connection";

export default class Customer extends Model {
  public readonly id: number;
  public name: string;
  public nick_name: string;
  public age: number;
  public mobile: string;
  public address: string;
  public education: string;
  public occupation: string;
  public salary: number;
  public hobbies: string;
  public readonly created_at: string;
  public readonly updated_at: string;
}

Customer.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nick_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hobbies: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "customer",
    modelName: "customer",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

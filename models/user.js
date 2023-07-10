import { DataTypes } from "sequelize";

import { getDBConnection } from "../utils/dbInitialize.js";

const sequelize = getDBConnection();

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    min: 5,
  },
});

sequelize.sync();

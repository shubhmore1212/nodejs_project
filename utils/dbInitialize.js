import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const getDBConnection = () => {
  const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, DB_DIALECT } =
    process.env;

  try {
    return new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
      host: MYSQL_HOST,
      dialect: DB_DIALECT,
    });
  } catch (error) {
    console.log(`DB Connection ${error}`);
  }
};

export const initDB = () => {
  return new Promise((resolve, reject) =>
    getDBConnection()
      .authenticate()
      .then(() => {
        resolve("Database connection has been established successfully");
      })
      .catch((error) => {
        reject(`Database connection: ${error}`);
      })
  );
};

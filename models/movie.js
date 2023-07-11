import { DataTypes } from "sequelize";
import { getDBConnection } from "../utils/dbInitialize.js";

const sequelize = getDBConnection();

export const movie = sequelize.define("movie", {
  Title: {
    type: DataTypes.STRING,
  },
  Year: {
    type: DataTypes.STRING,
  },
  Rated: {
    type: DataTypes.STRING,
  },
  Released: {
    type: DataTypes.STRING,
  },
  Runtime: {
    type: DataTypes.STRING,
  },
  Genre: {
    type: DataTypes.STRING,
  },
  Director: {
    type: DataTypes.STRING,
  },
  Writer: {
    type: DataTypes.STRING,
  },
  Actors: {
    type: DataTypes.STRING,
  },
  Plot: {
    type: DataTypes.STRING,
  },
  Language: {
    type: DataTypes.STRING,
  },
  Country: {
    type: DataTypes.STRING,
  },
  Awards: {
    type: DataTypes.STRING,
  },
  Poster: {
    type: DataTypes.STRING,
  },
  Ratings: {
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("Ratings"));
    },
    set: function (val) {
      return this.setDataValue("Ratings", JSON.stringify(val));
    },
  },
  Metascore: {
    type: DataTypes.STRING,
  },
  imdbRating: {
    type: DataTypes.STRING,
  },
  imdbVotes: {
    type: DataTypes.STRING,
  },
  imdbID: {
    type: DataTypes.STRING,
  },
  Type: {
    type: DataTypes.STRING,
  },
  DVD: {
    type: DataTypes.STRING,
  },
  BoxOffice: {
    type: DataTypes.STRING,
  },
  Production: {
    type: DataTypes.STRING,
  },
  Website: {
    type: DataTypes.STRING,
  },
  Response: {
    type: DataTypes.STRING,
  },
});

sequelize.sync();

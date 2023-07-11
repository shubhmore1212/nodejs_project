import axios from "axios";

import AppError from "../config/appError.js";
import { movie } from "../models/movie.js";
import { removingUnwantedKey } from "../utils/modyfingResponse.js";

export const insertMovie = async (payload) => {
  const result = await movie.create(payload);

  removingUnwantedKey(result["dataValues"], ["id", "updatedAt", "createdAt"]);

  return result;
};

export const searchMovie = async (payload) => {
  const result = await movie.findOne({
    where: {
      title: payload,
    },
  });

  if (result === null) {
    const res = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.ODMB_API_KEY}&t=${payload}`
    );

    if (res.data.Response === "True") {
      const result = await insertMovie(res.data);
      return { status: 200, message: result };
    } else {
      throw new AppError("Movie Not Found", 404);
    }
  }

  removingUnwantedKey(result["dataValues"], ["id", "updatedAt", "createdAt"]);

  return { status: 200, message: result };
};

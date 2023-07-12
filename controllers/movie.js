import { response } from "../config/responseUtil.js";
import { tryCatch } from "../middlewares/tryCatch.js";
import {
  checkForError,
  movieSearchSchema,
} from "../middlewares/validateParams.js";

import { insertMovie, searchMovie } from "../services/movie.js";

export const getMovie = tryCatch(async (req, res) => {
  const { movie_name } = req.body;

  const { error } = movieSearchSchema.validate(
    {
      movie_name,
    },
    {
      abortEarly: false,
    }
  );

  checkForError(error);

  const result = await searchMovie(movie_name);
  return response(res, 200, result);
});

export const addMovie = tryCatch(async (req, res) => {
  const result = await insertMovie(req.body);
  return response(res, 200, result);
});

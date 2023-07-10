import bcrypt from "bcrypt";
import { addUser } from "../services/user.js";
import {
  checkForError,
  registerUserSchema,
} from "../middlewares/validateParams.js";
import { response } from "../config/responseUtil.js";
import { tryCatch } from "../middlewares/tryCatch.js";

export const createUser = tryCatch(async (req, res) => {
  const { name, username, password } = req.body;

  const { error } = registerUserSchema.validate(
    {
      name,
      username,
      password,
    },
    {
      abortEarly: false,
    }
  );

  checkForError(error);

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const result = await addUser({ name, username, passwordHash });
  delete result["passwordHash"];

  return response(res, 200, result);
});

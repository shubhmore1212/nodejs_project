import { loginUser } from "../services/auth.js";
import { response } from "../config/responseUtil.js";
import { checkForError, loginSchema } from "../middlewares/validateParams.js";
import { tryCatch } from "../middlewares/tryCatch.js";

export const login = tryCatch(async (req, res) => {
  const { username, password } = req.body;
  const { error } = loginSchema.validate(
    { username, password },
    { abortEarly: false }
  );

  checkForError(error);

  const result = await loginUser({ username, password });

  return response(res, 200, result);
});

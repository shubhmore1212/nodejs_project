import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppError from "../config/appError.js";
import { User } from "../models/user.js";

export const loginUser = async (payload) => {
  const { username, password } = payload;

  const user = await User.findOne({ where: { username } });
  if (!user) throw new AppError("User does not exist", 401);

  const isMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isMatch) throw new AppError("Invalid Credentials", 401);

  const authToken = jwt.sign(
    { username: user.username, password: user.password },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { status: 200, authToken, message: "Login Successfull" };
};

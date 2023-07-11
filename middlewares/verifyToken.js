import jwt from "jsonwebtoken";

import AppError from "../config/appError.js";
import { response } from "../config/responseUtil.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      throw new AppError("Access Denied", 401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response(res, 400, { message: "Invalid Token" });
    }

    response(res, error.statusCode, { message: error.message });
  }
};

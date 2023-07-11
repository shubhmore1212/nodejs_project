import { response } from "../config/responseUtil.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const name = error.name;
  const message = error.message;
  const stack = error.stack;

  console.error("ERROR", stack);

  if (name === "ValidationError") {
    return response(res, 422, {
      name: "Validation Error",
      status: 422,
      message: error.details.map((e) => e.message),
    });
  }

  if (error instanceof Error) {
    return response(res, statusCode, { name, status: statusCode, message });
  }

  return response(res, statusCode, { name, status: statusCode, message });
};

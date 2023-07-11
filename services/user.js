import { User } from "../models/user.js";

export const addUser = async (payload) => {
  const result = await User.create({
    ...payload,
    password: payload.passwordHash,
  });

  return {
    status: 200,
    message: "User created sucessfully",
  };
};

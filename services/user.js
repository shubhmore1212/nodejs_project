import { User } from "../models/user.js";

export const addUser = async (payload) => {
  const result = await User.create({
    ...payload,
    password: payload.passwordHash,
  });

  return {
    message: "User created sucessfully",
  };
};

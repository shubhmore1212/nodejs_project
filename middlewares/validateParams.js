import Joi from "joi";

const userSchemaObj = {
  name: Joi.string().trim().required(),
  username: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
};

export const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});

export const registerUserSchema = Joi.object(userSchemaObj);

export const updateUserSchema = Joi.object({
  ...userSchemaObj,
  id: Joi.number().required(),
});

export const checkForError = (error) => {
  if (error) throw error;
};

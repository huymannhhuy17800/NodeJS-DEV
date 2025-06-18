import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .messages({ "string.empty": "Email là field bắt buộc" })
    .required(),
  password: Joi.string()
    .min(6)
    .messages({
      "string.empty": "Password là field bắt buộc",
      "string.min": "Password phải có ít nhất 6 kí tự ",
    })
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .messages({ "string.empty": "Email là field bắt buộc" })
    .required(),
  password: Joi.string()
    .messages({ "string.empty": "Password là field bắt buộc" })
    .required(),
});

export const todoSchema = Joi.object({
  content: Joi.string()
    .messages({ "string.empty": "Content là field bắt buộc" })
    .required()
    .trim(),
  completed: Joi.boolean(),
});

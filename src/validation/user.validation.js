import Joi from "joi";

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one letter and one number",
      }),
    role: Joi.string().valid("user", "admin"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sortBy: Joi.string(),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),

  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      email: Joi.string().email().trim(),
      password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/),
      role: Joi.string().valid("user", "admin"),
    })
    .min(1),
};

export default {
  createUser,
  getUsers,
  updateUser,
};
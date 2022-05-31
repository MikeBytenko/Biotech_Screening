const Joi = require("@hapi/joi");
const { JsonWebTokenError } = require("jsonwebtoken");

const createUserSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().optional(),
    password: Joi.string().min(6).max(72, "utf8").optional(),
    email: Joi.string().trim().email(),
    position: Joi.string().min(2),
    isFrom: Joi.string().min(5)
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().optional(),
  middleName: Joi.string().trim(),
  password: Joi.string().min(6).max(72, "utf8").optional(),
  email: Joi.string().trim().email(),
  age: Joi.number().min(1).max(100).optional(),
  sex: Joi.string().trim().optional(),
});

const loginUserSchema = Joi.object({
    password: Joi.string().min(6).max(72, "utf8").optional(),
    email: Joi.string().trim().email(),
});


module.exports = { createUserSchema, updateUserSchema, loginUserSchema };
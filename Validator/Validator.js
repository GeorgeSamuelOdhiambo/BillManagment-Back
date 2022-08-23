const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const newuser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const bill = Joi.object({
  billName: Joi.string().required(),
  billAmount: Joi.number().required(),
  billPaymentDate: Joi.required(),
  billDuration: Joi.number().required()
})

const resetpas = Joi.object({
  email: Joi.string().email().required()
})


exports.validateNewuser = validator(newuser)
exports.validateLogin = validator(login)
exports.validateBill = validator(bill)
exports.validateResetpass = validator(resetpas)
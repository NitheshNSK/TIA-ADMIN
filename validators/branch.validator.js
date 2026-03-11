const Joi = require("joi");

const branchValidationSchema = Joi.object({
  branchCode: Joi.string().required(),
  branchName: Joi.string().required(),
  branchOwnerEmail: Joi.string().email().required(),
  concept: Joi.array().items(Joi.string()),
  addressName: Joi.string().required(),
  area: Joi.string().required(),
  district: Joi.string().required(),
  pincode: Joi.number().required(),
  location: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").default("active"),
});

module.exports = { branchValidationSchema };

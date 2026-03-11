// course.validation.js
const Joi = require('joi');

const courseValidationSchema = Joi.object({
  courseCode: Joi.string().required(),
  courseName: Joi.string().required(),
  concept: Joi.string().required(), // Assuming concept field holds the ID of the related Concept document
  courseFee: Joi.number().required(),
  status: Joi.string().valid('active', 'inactive').default('active')
});

module.exports = courseValidationSchema;

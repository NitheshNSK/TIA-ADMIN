const EmailTemplate = require("../models/emailTemplate.model");

/* CREATE */

const createTemplate = async (data) => {
  const template = new EmailTemplate(data);
  return await template.save();
};

/* GET ALL */

const getTemplates = async () => {
  return await EmailTemplate.find().sort({ createdAt: -1 });
};

/* GET BY ID */

const getTemplateById = async (id) => {
  return await EmailTemplate.findById(id);
};

/* UPDATE */

const updateTemplate = async (id, data) => {
  return await EmailTemplate.findByIdAndUpdate(id, data, {
    new: true,
  });
};

/* DELETE */

const deleteTemplate = async (id) => {
  return await EmailTemplate.findByIdAndDelete(id);
};

/* GET BY NAME (for sending email) */

const getTemplateByName = async (name) => {
  return await EmailTemplate.findOne({ templateName: name });
};

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateByName,
};

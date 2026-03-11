const templateService = require("../services/emailTemplate.service");

/* CREATE */

const createTemplate = async (req, res, next) => {
  try {
    const data = await templateService.createTemplate(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* GET ALL */

const getTemplates = async (req, res, next) => {
  try {
    const data = await templateService.getTemplates();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* GET ONE */

const getTemplateById = async (req, res, next) => {
  try {
    const data = await templateService.getTemplateById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* UPDATE */

const updateTemplate = async (req, res, next) => {
  try {
    const data = await templateService.updateTemplate(req.params.id, req.body);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* DELETE */

const deleteTemplate = async (req, res, next) => {
  try {
    await templateService.deleteTemplate(req.params.id);

    res.json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};

const router = require("express").Router();
const controller = require("../controllers/emailTemplate.controller");


router.post("/", controller.createTemplate);

router.get("/", controller.getTemplates);

router.get("/:id", controller.getTemplateById);

router.put("/:id", controller.updateTemplate);

router.delete("/:id", controller.deleteTemplate);

module.exports = router;

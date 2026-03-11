const express = require("express");
const conceptRouter = express.Router();
const controller = require("../controllers/concepts.controller");

/* CRUD */
conceptRouter.post("/",  controller.createConcept);
conceptRouter.get("/",  controller.getAllConcepts);
conceptRouter.get("/:id",  controller.getConceptById);
conceptRouter.put("/:id",  controller.updateConcept);

/* soft delete lifecycle */
conceptRouter.delete("/:id",  controller.deleteConcept);
conceptRouter.patch("/:id/restore",  controller.restoreConcept);
conceptRouter.delete(
    "/:id/permanent",
    
    controller.permanentDeleteConcept
);

module.exports = conceptRouter;

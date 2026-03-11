const conceptService = require("../services/concept.service");

/* CREATE */
const createConcept = async (req, res, next) => {
    try {
        const concept = await conceptService.createConcept(req.body);
        res.status(201).json({ success: true, data: concept });
    } catch (err) {
        next(err);
    }
};

/* GET ALL (pagination) */
const getAllConcepts = async (req, res, next) => {
    try {
        const result = await conceptService.getAllConcepts(req.query);
        res.json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
};

/* GET BY ID */
const getConceptById = async (req, res, next) => {
    try {
        const concept = await conceptService.getConceptById(req.params.id);
        if (!concept)
            return res.status(404).json({ success: false, message: "Concept not found" });

        res.json({ success: true, data: concept });
    } catch (err) {
        next(err);
    }
};

/* UPDATE */
const updateConcept = async (req, res, next) => {
    try {
        const concept = await conceptService.updateConcept(req.params.id, req.body);
        if (!concept)
            return res.status(404).json({ success: false, message: "Concept not found" });

        res.json({ success: true, data: concept });
    } catch (err) {
        next(err);
    }
};

/* SOFT DELETE */
const deleteConcept = async (req, res, next) => {
    try {
        const concept = await conceptService.deleteConcept(req.params.id);
        if (!concept)
            return res.status(404).json({ success: false, message: "Concept not found" });

        res.json({ success: true, message: "Concept deleted successfully" });
    } catch (err) {
        next(err);
    }
};

/* RESTORE */
const restoreConcept = async (req, res, next) => {
    try {
        const concept = await conceptService.restoreConcept(req.params.id);
        if (!concept)
            return res.status(404).json({ success: false, message: "Concept not found" });

        res.json({ success: true, message: "Concept restored", data: concept });
    } catch (err) {
        next(err);
    }
};

/* PERMANENT DELETE */
const permanentDeleteConcept = async (req, res, next) => {
    try {
        const concept = await conceptService.permanentDeleteConcept(req.params.id);
        if (!concept)
            return res.status(404).json({ success: false, message: "Concept not found" });

        res.json({ success: true, message: "Concept permanently deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createConcept,
    getAllConcepts,
    getConceptById,
    updateConcept,
    deleteConcept,
    restoreConcept,
    permanentDeleteConcept,
};

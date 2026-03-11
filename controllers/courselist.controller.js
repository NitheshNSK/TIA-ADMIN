const discountModel = require("../models/discount.model");
const courseService = require("../services/courselist.service");

/* ---------------- CREATE ---------------- */
const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

/* ---------------- GET ALL ---------------- */
const getAllCourses = async (req, res, next) => {
    try {
        const result = await courseService.getAllCourses(req.query);
        res.json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
};

/* ---------------- GET BY ID ---------------- */
const getCourseById = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

        res.json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

/* ---------------- UPDATE ---------------- */
const updateCourse = async (req, res, next) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

        res.json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

/* ---------------- SOFT DELETE ---------------- */
const deleteCourse = async (req, res, next) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

        res.json({ success: true, message: "Course deleted successfully" });
    } catch (err) {
        next(err);
    }
};

/* ---------------- BULK DELETE ---------------- */
const deleteManyCourse = async (req, res, next) => {
    try {
        const { courseCodes } = req.body;
        if (!Array.isArray(courseCodes) || courseCodes.length === 0)
            return res.status(400).json({ success: false, message: "Invalid course ids" });

        const result = await courseService.deleteManyCourses(courseCodes);

        res.json({
            success: true,
            message: `${result.modifiedCount} courses deleted`,
        });
    } catch (err) {
        next(err);
    }
};

/* ---------------- RESTORE ---------------- */
const restoreCourse = async (req, res, next) => {
    try {
        const course = await courseService.restoreCourse(req.params.id);
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

        res.json({ success: true, message: "Course restored", data: course });
    } catch (err) {
        next(err);
    }
};

/* ---------------- PERMANENT DELETE ---------------- */
const permanentDeleteCourse = async (req, res, next) => {
    try {
        const course = await courseService.permanentDeleteCourse(req.params.id);
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

        res.json({ success: true, message: "Course permanently deleted" });
    } catch (err) {
        next(err);
    }
};

/* ---------------- DISCOUNTS (unchanged but cleaned) ---------------- */
const discountGenerate = async (req, res, next) => {
    try {
        const data = await new discountModel(req.body).save();
        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

const getDiscounts = async (req, res, next) => {
    try {
        const branchCode = req.query.branchCode;

        const forBranch = branchCode
            ? await discountModel.find({ branches: branchCode })
            : [];

        const forAll = await discountModel.find({ branches: "all" });

        res.json({ success: true, data: { forBranch, forAll } });
    } catch (err) {
        next(err);
    }
};

const getDiscountsForAdmin = async (req, res, next) => {
    try {
        const data = await discountModel.find();
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

const deleteDiscount = async (req, res, next) => {
    try {
        await discountModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Discount deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    deleteManyCourse,
    restoreCourse,
    permanentDeleteCourse,
    discountGenerate,
    getDiscounts,
    getDiscountsForAdmin,
    deleteDiscount,
};

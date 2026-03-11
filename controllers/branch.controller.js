const branchService = require("../services/branches.service");
const { branchValidationSchema } = require("../validators/branch.validator");

/* ---------------- CREATE ---------------- */
const createBranch = async (req, res, next) => {
    try {
        await branchValidationSchema.validateAsync(req.body);

        const branch = await branchService.createBranch(req.body);

        res.status(201).json({
            success: true,
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- GET ALL ---------------- */
const getAllBranches = async (req, res, next) => {
    try {
        const result = await branchService.getAllBranches(req.query);

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};


/* ---------------- GET BY ID ---------------- */
const getBranchById = async (req, res, next) => {
    try {
        const branch = await branchService.getBranchById(req.params.id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        res.json({
            success: true,
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- UPDATE ---------------- */
const updateBranch = async (req, res, next) => {
    try {
        await branchValidationSchema.validateAsync(req.body);

        const branch = await branchService.updateBranch(req.params.id, req.body);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        res.json({
            success: true,
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- SOFT DELETE (SINGLE) ---------------- */
const deleteBranch = async (req, res, next) => {
    try {
        const branch = await branchService.deleteBranch(req.params.id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        res.json({
            success: true,
            message: "Branch deleted successfully (soft delete)",
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- BULK SOFT DELETE ---------------- */
const deleteManyBranch = async (req, res, next) => {
    try {
        const { branchCodes } = req.body;

        if (!Array.isArray(branchCodes) || branchCodes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid branch codes",
            });
        }

        const result = await branchService.deleteManyBranches(branchCodes);

        res.json({
            success: true,
            message: `${result.modifiedCount} branches deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- RESTORE ---------------- */
const restoreBranch = async (req, res, next) => {
    try {
        const branch = await branchService.restoreBranch(req.params.id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found or already active",
            });
        }

        res.json({
            success: true,
            message: "Branch restored successfully",
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

/* ---------------- PERMANENT DELETE ---------------- */
const permanentDeleteBranch = async (req, res, next) => {
    try {
        const branch = await branchService.permanentDeleteBranch(req.params.id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        res.json({
            success: true,
            message: "Branch permanently deleted",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    deleteManyBranch,
    restoreBranch,
    permanentDeleteBranch,
};

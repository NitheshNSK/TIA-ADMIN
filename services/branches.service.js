const Branch = require("../models/branch.model");

/* ---------------- CREATE ---------------- */
const createBranch = async (data) => {
    return await Branch.create(data);
};

/* ---------------- READ ---------------- */
const getBranchById = async (id) => {
    return await Branch.findOne({ _id: id, isDeleted: false });
};

const getAllBranches = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";
    const status = query.status;

    const sortBy = query.sortBy || "createdAt";
    const order = query.order === "asc" ? 1 : -1;

    /* 🔍 Build filter */
    const filter = {
        isDeleted: false,
    };

    if (search) {
        filter.$or = [
            { branchName: { $regex: search, $options: "i" } },
            { branchCode: { $regex: search, $options: "i" } },
            { district: { $regex: search, $options: "i" } },
        ];
    }

    if (status) {
        filter.status = status;
    }

    /* 📊 Query DB */
    const [data, total] = await Promise.all([
        Branch.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit),

        Branch.countDocuments(filter),
    ]);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};


/* ---------------- UPDATE ---------------- */
const updateBranch = async (id, data) => {
    return await Branch.findOneAndUpdate(
        { _id: id, isDeleted: false },
        data,
        { new: true, runValidators: true }
    );
};

/* ---------------- SOFT DELETE ---------------- */
const deleteBranch = async (id) => {
    return await Branch.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
            isDeleted: true,
            deletedAt: new Date(),
            status: "inactive",
        },
        { new: true }
    );
};

/* ---------------- BULK SOFT DELETE ---------------- */
const deleteManyBranches = async (branchCodes) => {
    return await Branch.updateMany(
        { branchCode: { $in: branchCodes }, isDeleted: false },
        {
            isDeleted: true,
            deletedAt: new Date(),
            status: "inactive",
        }
    );
};

/* ---------------- RESTORE ---------------- */
const restoreBranch = async (id) => {
    return await Branch.findOneAndUpdate(
        { _id: id, isDeleted: true },
        {
            isDeleted: false,
            deletedAt: null,
            status: "active",
        },
        { new: true }
    );
};

/* ---------------- PERMANENT DELETE ---------------- */
const permanentDeleteBranch = async (id) => {
    return await Branch.findByIdAndDelete(id);
};

module.exports = {
    createBranch,
    getBranchById,
    getAllBranches,
    updateBranch,
    deleteBranch,
    deleteManyBranches,
    restoreBranch,
    permanentDeleteBranch,
};

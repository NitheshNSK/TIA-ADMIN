const Concept = require("../models/concept.model");
const Course = require("../models/courselist.model");

/* ---------------- CREATE ---------------- */
const createConcept = async (data) => {
    return await Concept.create(data);
};

/* ---------------- GET BY ID ---------------- */
const getConceptById = async (id) => {
    return await Concept.findOne({ _id: id, isDeleted: false });
};

/* -------- PAGINATION + FILTER -------- */
const getAllConcepts = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";
    const status = query.status;

    const sortBy = query.sortBy || "createdAt";
    const order = query.order === "asc" ? 1 : -1;

    const filter = { isDeleted: false };

    if (search) {
        filter.$or = [
            { conceptName: { $regex: search, $options: "i" } },
            { conceptCode: { $regex: search, $options: "i" } },
        ];
    }

    if (status) filter.status = status;

    const [data, total] = await Promise.all([
        Concept.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit),

        Concept.countDocuments(filter),
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
const updateConcept = async (id, data) => {
    const concept = await Concept.findOne({ _id: id, isDeleted: false });
    if (!concept) return null;

    /* sync course status */
    if (data.status === "active" || data.status === "inactive") {
        await Course.updateMany({ concept: id }, { status: data.status });
    }

    return await Concept.findByIdAndUpdate(id, data, { new: true });
};

/* ---------------- SOFT DELETE ---------------- */
const deleteConcept = async (id) => {
    const concept = await Concept.findOne({ _id: id, isDeleted: false });
    if (!concept) return null;

    /* soft delete related courses */
    await Course.updateMany(
        { concept: id },
        { isDeleted: true, deletedAt: new Date(), status: "inactive" }
    );

    return await Concept.findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date(), status: "inactive" },
        { new: true }
    );
};

/* ---------------- RESTORE ---------------- */
const restoreConcept = async (id) => {
    const concept = await Concept.findOne({ _id: id, isDeleted: true });
    if (!concept) return null;

    await Course.updateMany(
        { concept: id },
        { isDeleted: false, deletedAt: null, status: "active" }
    );

    return await Concept.findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null, status: "active" },
        { new: true }
    );
};

/* ---------------- PERMANENT DELETE ---------------- */
const permanentDeleteConcept = async (id) => {
    await Course.deleteMany({ concept: id });
    return await Concept.findByIdAndDelete(id);
};

module.exports = {
    createConcept,
    getConceptById,
    getAllConcepts,
    updateConcept,
    deleteConcept,
    restoreConcept,
    permanentDeleteConcept,
};

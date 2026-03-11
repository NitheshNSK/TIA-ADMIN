const Course = require("../models/courselist.model");

/* ---------------- CREATE ---------------- */
const createCourse = async (data) => {
    return await Course.create(data);
};

/* ---------------- READ ---------------- */
const getCourseById = async (id) => {
    return await Course.findOne({ _id: id, isDeleted: false });
};

/* -------- PAGINATION + FILTER -------- */
const getAllCourses = async (query) => {
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
            { courseName: { $regex: search, $options: "i" } },
            { courseCode: { $regex: search, $options: "i" } },
            { conceptName: { $regex: search, $options: "i" } },
        ];
    }

    if (status) filter.status = status;

    const [data, total] = await Promise.all([
        Course.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit),

        Course.countDocuments(filter),
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
const updateCourse = async (id, data) => {
    return await Course.findOneAndUpdate(
        { _id: id, isDeleted: false },
        data,
        { new: true, runValidators: true }
    );
};

/* ---------------- SOFT DELETE ---------------- */
const deleteCourse = async (id) => {
    return await Course.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true, deletedAt: new Date(), status: "inactive" },
        { new: true }
    );
};

/* ---------------- BULK SOFT DELETE ---------------- */
const deleteManyCourses = async (ids) => {
    return await Course.updateMany(
        { _id: { $in: ids }, isDeleted: false },
        { isDeleted: true, deletedAt: new Date(), status: "inactive" }
    );
};

/* ---------------- RESTORE ---------------- */
const restoreCourse = async (id) => {
    return await Course.findOneAndUpdate(
        { _id: id, isDeleted: true },
        { isDeleted: false, deletedAt: null, status: "active" },
        { new: true }
    );
};

/* ---------------- PERMANENT DELETE ---------------- */
const permanentDeleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
};

module.exports = {
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse,
    deleteManyCourses,
    restoreCourse,
    permanentDeleteCourse,
};

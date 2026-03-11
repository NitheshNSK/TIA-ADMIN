const express = require("express");
const courseRouter = express.Router();

const courseController = require("../controllers/courselist.controller");
const passport = require("passport");


/* ================= COURSE CRUD ================= */

/* Create */
courseRouter.post("/", courseController.createCourse);

/* Read */
courseRouter.get("/", courseController.getAllCourses); // pagination + filters
courseRouter.get("/:id", courseController.getCourseById);

/* Update */
courseRouter.put("/:id", courseController.updateCourse);

/* Soft Delete */
courseRouter.delete("/:id", courseController.deleteCourse);

/* Bulk Soft Delete */
courseRouter.post("/delete/many", courseController.deleteManyCourse);

/* Restore */
courseRouter.patch("/:id/restore", courseController.restoreCourse);

/* Permanent Delete */
courseRouter.delete(
    "/:id/permanent",
    courseController.permanentDeleteCourse
);

/* ================= DISCOUNT ================= */

/* Create discount */
courseRouter.post("/discount", courseController.discountGenerate);

/* View discounts for branch/user */
courseRouter.get("/discount/view", courseController.getDiscounts);

/* View all discounts (admin) */
courseRouter.get(
    "/discount/view/admin",
    courseController.getDiscountsForAdmin
);

/* Delete discount */
courseRouter.delete("/discount/:id", courseController.deleteDiscount);

module.exports = courseRouter;

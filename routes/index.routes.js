const router = require("express").Router();
const adminRouter = require("./admin.route");

router.use("/admin", adminRouter);

module.exports = { router };

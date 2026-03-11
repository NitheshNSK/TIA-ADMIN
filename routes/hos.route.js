const courseRouter = require("./courselist.route");
const hosRoute = require("express").Router();
const branchRouter = require("./branch.route");
hosRoute.use("/branch", branchRouter);

hosRoute.use("/courselist", courseRouter);

module.exports = hosRoute;
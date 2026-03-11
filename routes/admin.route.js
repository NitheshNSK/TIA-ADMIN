const { adminLogin } = require('../controllers/admin.controller');
const { checkToken } = require('../controllers/auth.controller');
const { hoStaff } = require('../controllers/hos.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const branchRouter = require('./branch.route');
const conceptRouter = require('./concept.routes');
const courseRouter = require('./courselist.route');

const adminRoute = require('express').Router();


adminRoute.post("/login", adminLogin);
adminRoute.get("/check-token", checkToken);
adminRoute.use("/branch", authenticateUser, branchRouter);
adminRoute.use('/courselist', authenticateUser,courseRouter );
adminRoute.use('/concept', authenticateUser,conceptRouter);
adminRoute.get('/hos', authenticateUser, hoStaff);




module.exports = adminRoute;
const adminController = require("../controllers/admin.controller");
const { checkToken } = require("../controllers/auth.controller");
const { hoStaff } = require("../controllers/hos.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const branchRouter = require("./branch.route");
const conceptRouter = require("./concept.routes");
const courseRouter = require("./courselist.route");

const adminRoute = require("express").Router();

const emailTemplateRouter = require("./emailTemplate.route");
/* ================= AUTH ================= */

adminRoute.post("/login", adminController.adminLogin);
adminRoute.get("/check-token", checkToken);

/* ================= CORE MODULES ================= */

adminRoute.use("/branch", authenticateUser, branchRouter);
adminRoute.use("/courselist", authenticateUser, courseRouter);
adminRoute.use("/concept", authenticateUser, conceptRouter);

/* ================= HOS ================= */

adminRoute.get("/hos", authenticateUser, hoStaff);
adminRoute.post("/hos", authenticateUser, adminController.addHos);
adminRoute.put("/hos/:id", authenticateUser, adminController.updateHos);
adminRoute.get("/hos/:id", authenticateUser, adminController.getHosById);

/* ================= USERS ================= */

adminRoute.delete("/users/:id", authenticateUser, adminController.deleteUser);
adminRoute.put("/users/:id", authenticateUser, adminController.updateUser);

/* ================= AUTO USER ================= */

//adminRoute.post("/addautouser", authenticateUser, adminController.addAutoUser);

/* ================= VIP ================= */

adminRoute.post("/vip", authenticateUser, adminController.addVip);
adminRoute.get("/vip", authenticateUser, adminController.getVip);
adminRoute.get("/vip/:id", authenticateUser, adminController.getVipById);
adminRoute.put("/vip/:id", authenticateUser, adminController.updateVip);
adminRoute.get("/vip/referals", authenticateUser, adminController.vipReferals);
adminRoute.get("/vip/export", authenticateUser, adminController.exportVipExcel);
/* ================= VIP FRANCHISE ================= */

adminRoute.post(
  "/vipfranchise",
  authenticateUser,
  adminController.addVipFranchise
);

adminRoute.get(
  "/vipfranchise",
  authenticateUser,
  adminController.getVipFranchise
);

adminRoute.get(
  "/vipfranchise/:id",
  authenticateUser,
  adminController.getVipFranchiseById
);

adminRoute.put(
  "/vipfranchise/:id",
  authenticateUser,
  adminController.updateVipFranchise
);

adminRoute.get(
  "/vipfranchise/referals",
  authenticateUser,
  adminController.referalVipFranchise
);

adminRoute.get(
  "/vipfranchise/export",
  authenticateUser,
  adminController.exportVipFranchiseExcel
);
/* ================= FRANCHISE ================= */

adminRoute.post("/franchise", authenticateUser, adminController.addFranchise);

adminRoute.get("/franchise", authenticateUser, adminController.getFranchise);

adminRoute.get(
  "/franchise/:id",
  authenticateUser,
  adminController.getFranchiseById
);

adminRoute.put(
  "/franchise/:id",
  authenticateUser,
  adminController.updateFranchise
);

adminRoute.get(
  "/franchise/referals",
  authenticateUser,
  adminController.referalFranchise
);

adminRoute.get(
  "/franchise/export",
  authenticateUser,
  adminController.exportFranchiseExcel
);

/* ================= FRANCHISE OWNER ================= */

adminRoute.post(
  "/franchise-owner",
  authenticateUser,
  adminController.addFranchiseOwner
);

adminRoute.get(
  "/franchise-owner",
  authenticateUser,
  adminController.getFranchiseOwners
);

adminRoute.get(
  "/franchise-owner/:id",
  authenticateUser,
  adminController.getFranchiseOwnerById
);

/* ================= STUDENT ================= */

adminRoute.post("/student", authenticateUser, adminController.addStudent);

adminRoute.get("/student", authenticateUser, adminController.getStudents);

adminRoute.get(
  "/student/:id",
  authenticateUser,
  adminController.getStudentById
);

adminRoute.put("/student/:id", authenticateUser, adminController.updateStudent);

adminRoute.get(
  "/student/referals",
  authenticateUser,
  adminController.studentReferals
);

adminRoute.get(
  "/student/export",
  authenticateUser,
  adminController.exportStudentExcel
);

/* ================= SETTINGS ================= */

adminRoute.post(
  "/settings",
  authenticateUser,
  adminController.updateSettingsController
);

adminRoute.get(
  "/settings",
  authenticateUser,
  adminController.getSettingsController
);

adminRoute.use("/email-template", authenticateUser, emailTemplateRouter);
module.exports = adminRoute;

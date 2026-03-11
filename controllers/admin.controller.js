const { adminLoginService } = require("../services/admin.service");
const adminService = require("../services/admin.service");
const { getPagination } = require("../utils/pagination");

const adminLogin = async (req, res, next) => {
  try {
    const result = await adminLoginService(req.body);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await adminService.deleteUserById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await adminService.updateUserById(req.params.id, req.body);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getVipFranchise = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.aggregateVipFranchise(pagination);

    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const referalVipFranchise = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.vipFranchiseReferals(pagination);

    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const getFranchise = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.aggregateFranchise(pagination);

    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const referalFranchise = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.referredFranchise(pagination);

    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

/* ================= HOS ================= */

const addHos = async (req, res, next) => {
  try {
    const data = await adminService.addHos(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateHos = async (req, res, next) => {
  try {
    const data = await adminService.updateHos(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getHosById = async (req, res, next) => {
  try {
    const data = await adminService.getHosById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* ================= VIP ================= */

const addVip = async (req, res, next) => {
  try {
    const data = await adminService.addVip(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getVip = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.getVip(pagination);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const getVipById = async (req, res, next) => {
  try {
    const data = await adminService.getVipById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateVip = async (req, res, next) => {
  try {
    const data = await adminService.updateVip(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const vipReferals = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.vipReferals(pagination);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

/* ================= VIP FRANCHISE ================= */

const addVipFranchise = async (req, res, next) => {
  try {
    const data = await adminService.addVipFranchise(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getVipFranchiseById = async (req, res, next) => {
  try {
    const data = await adminService.getVipFranchiseById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateVipFranchise = async (req, res, next) => {
  try {
    const data = await adminService.updateVipFranchise(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* ================= FRANCHISE ================= */

const addFranchise = async (req, res, next) => {
  try {
    const data = await adminService.addFranchise(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getFranchiseById = async (req, res, next) => {
  try {
    const data = await adminService.getFranchiseById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateFranchise = async (req, res, next) => {
  try {
    const data = await adminService.updateFranchise(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* ================= FRANCHISE OWNER ================= */

const addFranchiseOwner = async (req, res, next) => {
  try {
    const data = await adminService.addFranchiseOwner(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getFranchiseOwners = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.getFranchiseOwners(pagination);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const getFranchiseOwnerById = async (req, res, next) => {
  try {
    const data = await adminService.getFranchiseOwnerById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* ================= STUDENT ================= */

const addStudent = async (req, res, next) => {
  try {
    const data = await adminService.addStudent(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.getStudents(pagination);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const data = await adminService.getStudentById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const data = await adminService.updateStudent(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const studentReferals = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await adminService.studentReferals(pagination);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

/* ================= EXCEL EXPORTS ================= */

const exportVipFranchiseExcel = async (req, res, next) => {
  try {
    const workbook = await adminService.exportVipFranchiseExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=vip-franchise.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

const exportFranchiseExcel = async (req, res, next) => {
  try {
    const workbook = await adminService.exportFranchiseExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=franchise.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

const exportStudentExcel = async (req, res, next) => {
  try {
    const workbook = await adminService.exportStudentExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
const exportVipExcel = async (req, res, next) => {
  try {
    const workbook = await adminService.exportVipExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader("Content-Disposition", "attachment; filename=vip-users.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
/* ================= SETTINGS ================= */

const updateSettingsController = async (req, res, next) => {
  try {
    const data = await adminService.updateSettings(req.body);

    res.json({
      success: true,
      message: "Settings updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getSettingsController = async (req, res, next) => {
  try {
    const data = await adminService.getSettings();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
// const addAutoUser = async (req, res, next) => {
//   try {
//     const result = await adminService.addAutoUser(req.body);

//     res.json({
//       success: true,
//       message: "User created and email sent successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  adminLogin,
  deleteUser,
  updateUser,
  getVipFranchise,
  referalVipFranchise,
  getFranchise,
  referalFranchise,

  addHos,
  updateHos,
  getHosById,

  addVip,
  getVip,
  getVipById,
  updateVip,
  vipReferals,

  addVipFranchise,
  getVipFranchiseById,
  updateVipFranchise,
  exportVipFranchiseExcel,

  addFranchise,
  getFranchiseById,
  updateFranchise,
  exportFranchiseExcel,

  addFranchiseOwner,
  getFranchiseOwners,
  getFranchiseOwnerById,

  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  studentReferals,
  exportStudentExcel,
  exportVipExcel,

  updateSettingsController,
  getSettingsController,
};

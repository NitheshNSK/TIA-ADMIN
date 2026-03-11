const bcrypt = require("bcryptjs");
const ExcelJS = require("exceljs");

const User = require("../models/user.model");
const Accounts = require("../models/accounts.model");
const referUser = require("../models/vip.model");
const Student = require("../models/student.model");
const Settings = require("../models/settings.model");
// const { sendEmailUser } = require("../services/gmail.servise");
const { signToken } = require("../auth/token.utils");

/* ================= ADMIN LOGIN ================= */

const adminLoginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  if (user.userType !== "admin") {
    throw new Error("Not an admin");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({
    id: user._id,
    role: user.userType,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.userName,
      email: user.email,
      role: user.userType,
    },
  };
};

/* ================= USER MANAGEMENT ================= */

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (user) {
    await Accounts.findOneAndDelete({ userId });
  }

  return user;
};

const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};

/* ================= VIP FRANCHISE ================= */

const aggregateVipFranchise = async ({ page, limit, skip }) => {
  const match = {
    userType: "vip",
    workingOption: { $in: ["vipFranchise"] },
  };

  const aggregation = [
    { $match: match },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await User.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

const vipFranchiseReferals = async ({ page, limit, skip }) => {
  const aggregation = [
    {
      $match: {
        workingOption: { $in: ["vipFranchise"] },
      },
    },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await referUser.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

const addVipFranchise = async (data) => {
  const user = new User({
    ...data,
    userType: "vip",
    workingOption: ["vipFranchise"],
  });

  await user.save();
  return user;
};

const getVipFranchiseById = async (id) => {
  return await User.findById(id);
};

const updateVipFranchise = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

/* ================= FRANCHISE ================= */

const aggregateFranchise = async ({ page, limit, skip }) => {
  const aggregation = [
    { $match: { userType: "franchise" } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await User.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

const referredFranchise = async ({ page, limit, skip }) => {
  const aggregation = [
    { $match: { userType: "franchise" } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await referUser.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

const addFranchise = async (data) => {
  const user = new User({
    ...data,
    userType: "franchise",
  });

  await user.save();
  return user;
};

const getFranchiseById = async (id) => {
  return await User.findById(id);
};

const updateFranchise = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

/* ================= VIP ================= */

const addVip = async (data) => {
  const user = new User({
    ...data,
    userType: "vip",
  });

  await user.save();
  return user;
};

const getVip = async ({ page, limit, skip }) => {
  const aggregation = [
    { $match: { userType: "vip" } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await User.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

const getVipById = async (id) => {
  return await User.findById(id);
};

const updateVip = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const vipReferals = async ({ page, limit, skip }) => {
  const aggregation = [
    { $match: { userType: "vip" } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await referUser.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

/* ================= STUDENTS ================= */

const addStudent = async (data) => {
  const student = new Student(data);
  await student.save();
  return student;
};

const getStudents = async ({ page, limit, skip }) => {
  const total = await Student.countDocuments();

  const data = await Student.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

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

const getStudentById = async (id) => {
  return await Student.findById(id);
};

const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

const studentReferals = async ({ page, limit, skip }) => {
  const aggregation = [
    { $match: { status: "pending" } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await Student.aggregate(aggregation);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

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

/* ================= EXCEL EXPORT ================= */

const exportVipFranchiseExcel = async () => {
  const users = await User.find({
    userType: "vip",
    workingOption: { $in: ["vipFranchise"] },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("VIP Franchise");

  sheet.columns = [
    { header: "Name", key: "userName", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phoneNumber", width: 20 },
    { header: "Created", key: "createdAt", width: 25 },
  ];

  users.forEach((user) => {
    sheet.addRow(user);
  });

  return workbook;
};

const exportFranchiseExcel = async () => {
  const users = await User.find({ userType: "franchise" });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Franchise");

  sheet.columns = [
    { header: "Name", key: "userName", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phoneNumber", width: 20 },
    { header: "Created", key: "createdAt", width: 25 },
  ];

  users.forEach((user) => {
    sheet.addRow(user);
  });

  return workbook;
};

const exportStudentExcel = async () => {
  const students = await Student.find();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Students");

  sheet.columns = [
    { header: "Student Name", key: "studentName", width: 25 },
    { header: "Phone", key: "phoneNumber", width: 20 },
    { header: "Status", key: "status", width: 20 },
  ];

  students.forEach((s) => {
    sheet.addRow({
      studentName: s.personalInfo?.studentName,
      phoneNumber: s.personalInfo?.phoneNumber,
      status: s.status,
    });
  });

  return workbook;
};

const exportVipExcel = async () => {
  const users = await User.find({ userType: "vip" });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("VIP Users");

  sheet.columns = [
    { header: "Name", key: "userName", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phoneNumber", width: 20 },
    { header: "User Type", key: "userType", width: 20 },
    { header: "Created At", key: "createdAt", width: 25 },
  ];

  users.forEach((user) => {
    sheet.addRow({
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      createdAt: user.createdAt,
    });
  });

  return workbook;
};
/* ================= SETTINGS ================= */

const updateSettings = async (settingsData) => {
  return await Settings.findOneAndUpdate({}, settingsData, {
    new: true,
    upsert: true,
  });
};

const getSettings = async () => {
  return await Settings.findOne({});
};

module.exports = {
  adminLoginService,

  deleteUserById,
  updateUserById,

  aggregateVipFranchise,
  vipFranchiseReferals,
  addVipFranchise,
  getVipFranchiseById,
  updateVipFranchise,

  aggregateFranchise,
  referredFranchise,
  addFranchise,
  getFranchiseById,
  updateFranchise,

  addVip,
  getVip,
  getVipById,
  updateVip,
  vipReferals,

  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  studentReferals,

  exportVipFranchiseExcel,
  exportFranchiseExcel,
  exportStudentExcel,
  exportVipExcel,
  updateSettings,
  getSettings,
};

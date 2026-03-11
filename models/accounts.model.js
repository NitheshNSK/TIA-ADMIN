const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    userName: String,
    userType: String,
    email: String,
    phoneNumber: String,

    /* quick dashboard stats */
    totalRevenue: { type: Number, default: 0 },
    totalCollection: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },

    currentMonthRevenue: { type: Number, default: 0 },
    currentMonthCollection: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accounts", accountSchema);

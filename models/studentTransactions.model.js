const mongoose = require("mongoose");

const studentTransactionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      index: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    month: {
      type: String,
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentTransactions",
  studentTransactionSchema
);

const mongoose = require("mongoose");

const salaryTransactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      index: true,
    },

    amount: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    description: String,

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalaryTransactions", salaryTransactionSchema);

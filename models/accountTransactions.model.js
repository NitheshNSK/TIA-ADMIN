const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    month: {
      type: String,
    },

    collection: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    student: {
      type: Number,
      default: 0,
    },

    additionalRevenue: {
      type: Number,
      default: 0,
    },

    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccountTransactions", transactionSchema);

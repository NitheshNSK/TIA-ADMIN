// models/Transaction.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account", // Reference to the Account collection
    required: true,
  },
  transactions: [
    {
      

    },
  ],
});

module.exports = mongoose.model("Transaction", transactionSchema);

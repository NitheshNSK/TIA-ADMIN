const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  vipReferralCommission: { type: Number, default: 0 },
  vipFranchiseReferralCollection: { type: Number, default: 0 },
  vipFranchiseReferralRevenue: { type: Number, default: 0 },
  franchiseBusinessCommission: { type: Number, default: 0 },
  franchiseReferralCollection: { type: Number, default: 0 },
  franchiseReferralRevenue: { type: Number, default: 0 },
  GSTPercentage: { type: Number, default: 0 },
  vipSupportNumber: { type: Number, default: 0 },
  franchiseSupportNumber: { type: Number, default: 0 },
  enableRegistration: {
    type: Boolean,
    default: true,
  },

  enableLogin: {
    type: Boolean,
    default: true,
  },

  admin2FARequired: {
    type: Boolean,
    default: false,
  },
  emailProvider: {
    type: String,
    default: "resend",
  },

  resendApiKey: {
    type: String,
    default: "",
  },

  emailFromName: {
    type: String,
    default: "TIA Support",
  },

  emailFromAddress: {
    type: String,
    default: "support@tiaedu.in",
  },
});
const Settings = mongoose.model("Settings", SettingsSchema);

module.exports = Settings;

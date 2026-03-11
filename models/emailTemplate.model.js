const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
      unique: true
    },

    subject: {
      type: String,
      required: true
    },

    htmlContent: {
      type: String,
      required: true
    },

    variables: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);
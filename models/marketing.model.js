const mongoose = require("mongoose");

const marketingSchema = new mongoose.Schema(
  {
    imagekey: { type: [String] },  // Array of strings for image keys
    desc: { type: String, required: true },
    medium: { type: [String] },    // Array of strings for different mediums
    user_mail: { type: String, required: true }, // Add user_mail field
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("MarketingUpdate", marketingSchema);

const mongoose = require("mongoose");

// Define the schema for the VIP system
const vipSystemSchema = new mongoose.Schema({
  monthData: {
    type: Map, // Store month-year data as dynamic keys
    of: Array, // Each key will have an array of VIP data as the value
    default: {}, // Initialize as an empty object
  },
});
// Create the VipSystem model
const VipSystem = mongoose.model("VipSystem", vipSystemSchema);

module.exports = VipSystem;

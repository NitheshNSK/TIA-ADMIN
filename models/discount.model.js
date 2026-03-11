const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: String, required: true },
  description:{type:String,required:true},
  branches: { type: [Object], default: ["all"] },
  branchName:{type:String,default:"all"},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Discount", discountSchema);

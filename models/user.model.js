const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    userName: { type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: String, default: "" },
    bankAccountName: { type: String, default: "" },
    bankAccountNumber: { type: String, default: "" },
    bankBranchName: { type: String, default: "" },
    bloodGroup: { type: String, default: "" },
    country: { type: String, default: "" },
    dateOfBirth: { type: Date, default: "" },
    educationDetails: { type: [Object], default: [] },
    district: { type: String, default: "" },
    doorFlatNumber: { type: String, default: "" },
    facebook: { type: String, default: "" },
    fatherName: { type: String, default: "" },
    gender: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    instagram: { type: String, default: "" },
    jobDescription: { type: [Object], default: "" },
    joinedDate: { type: Date, default: "" },
    landMark: { type: String, default: "" },
    monthlySalary: { type: String, default: "" },
    motherName: { type: String, default: "" },
    newForWorking: { type: String, default: "" },
    panCardNumber: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    pinCode: { type: String, default: "" },
    state: { type: String, default: "" },
    streetName: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    whatsappNumber: { type: String, default: "" },
    userType: { type: String, required: true },
    imageACCESSKEY: { type: String, required: true },
    workingOption: { type: [String], default: [] },
    referredBy: { type: Object, default:{} },
    status: { type: String, default: "active" },
    otherDetails: { type: Object, default: {} },
  },
  { timestamps: true }
);


module.exports = mongoose.model("users", userSchema);


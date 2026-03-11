const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    personalInfo: {
      studentName: String,
      phoneNumber: String,
      age: String,
      dob: String,
      bloodGroup: String,
      classCourse: String,
      schoolCollege: String,
      gender: String,
    },

    familyDetails: {
      fathersName: String,
      fathersPhone: String,
      fathersWhatsAppNumber: String,
      mothersName: String,
      mothersPhone: String,
      mothersWhatsAppNumber: String,
      sibilings: Array,
    },

    address: {
      flatNo: String,
      street: String,
      district: String,
      state: String,
      pinCode: String,
      landmark: String,
      country: { type: String, default: "India" },
    },

    courseDetail: {
      courseName: Object,
      conceptName: Object,
      branchName: Object,
    },

    referenceId: { type: String },
    referenceName: { type: String },

    status: {
      type: String,
      enum: [
        "notIntrested",
        "pending",
        "studying",
        "completed",
        "discontinued",
      ],
      default: "pending",
    },

    otherDetails: {
      amountToPay: { type: Number, default: 0 },
      amountPaid: { type: Number, default: 0 },
      status: { type: String, default: "pending" },
    },

    imageACCESSKEY: { type: String, default: "" },

    feedBackquestion: {
      feedback1: { type: String, default: "0" },
      feedback2: { type: String, default: "0" },
      feedback3: { type: String, default: "0" },
      feedback4: { type: String, default: "0" },
      feedback5: { type: String, default: "0" },
      feedBacks: { type: String, default: "notyet" },
    },

    companyRevenueStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

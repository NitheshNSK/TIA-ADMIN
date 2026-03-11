const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});
const attendanceSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    month:{
      type:String,
    },
    year:{
      type:String
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave","half-day"],
      required: true,
    },
  },
  { timestamps: true }
);
const mediaUpdatesSchema=new mongoose.Schema({
  posters:{type:[String]},
  videos:{type:[String]},
  photos:{type:[String]}
})


const mediaUpdates=mongoose.model('MediaUpdates',mediaUpdatesSchema)
const Attendance = mongoose.model("Attendance", attendanceSchema);
const OTP = mongoose.model("Otp", otpSchema);


module.exports = { OTP, Attendance };
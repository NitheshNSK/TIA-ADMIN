
const mongoose=require("mongoose");

const transactionSchema1 = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  month: { type: String, required: true }, // YYYY-MM format
  collection: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  student: { type: Number, default: 0 },
  additionalrevenue: { type: Number, default: 0 },
});
const transactionSchema2 = new mongoose.Schema({
  date: { type: String, default:Date.now },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default:"pending"},
  description: { type: String, default: "" },
});
const accountsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    userName: { type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    transactionDetail: { type: Object, required: true },
    transactions: [transactionSchema1],
    salaryTranscation: [transactionSchema2],
    transactionsRecieved: [transactionSchema2],
    phoneNumber:{type:String,required:true},
  },
  { timestamps: true }
);


const Accounts = mongoose.model("Accounts", accountsSchema);

module.exports = Accounts;
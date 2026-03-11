const mongoose=require("mongoose");

const accountsSchema = new mongoose.Schema(
  {message:{type:String,required:true},
  shows:{type:[String]},
  viewed:{type:[String]}
  },
  { timestamps: true }
);

const Accounts = mongoose.model("messages", accountsSchema);

module.exports = Accounts;
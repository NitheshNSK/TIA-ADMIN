const mongoose = require('mongoose');

const meetingSchema={
schedulerType: { type: String },
schedulerName: { type: String },
scheduledDate: { type: String },
scheduledTime: { type: String },
meetingStatus: { type: String, enum: ['active', 'inactive'], default: 'inactive' },}


// Define the Mongoose schema
const LeadsSchema = new mongoose.Schema({
  

  personalInformation: {
    studentName:{type:String,required:true},
    phoneNumber: {type:String,required:true},
    age: {type:String},
    bloodGroup:{type:String},
    dataOfBirth:{type:String},
    gender:{type:String},
    fatherName: {type:String},
    motherName:{type:String},
    degree:{type:String},
    leadStatus:{type:String,default:"pending"}
},// Assuming location is a string containing a link
address: {
  streetNo: {type:String},
  streetName: {type:String},
  landmark:{type:String},
  district:{type:String},
  state:{type:String},
  pincode:{type:String}
},
generalInformation:{
    followersId: { type: String },
    followersName: { type: String },
    source: { type: String 
}},
  meeting:[meetingSchema],
  
  messages:{
    type:[String]
  }
}, { timestamps: true });



// Compile models from schema

module.exports =  mongoose.model('Leads', LeadsSchema);

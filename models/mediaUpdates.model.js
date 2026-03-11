const mongoose = require("mongoose");

const postSchema=new mongoose.Schema({
    imagekey:{type:String},
    types:{type:String},
    date:{type:Date ,default:new Date()},
    users:[String]
})

const photoSchema=new mongoose.Schema({
    imagekey:{type:String},
    types:{type:String},
    date:{type:Date  ,default:new Date()},
    users:[String]
})
const videoSchema=new mongoose.Schema({
    imagekey:{type:String},
    types:{type:String},
    date:{type:Date  ,default:new Date()},
    users:[String]
})



const mediaSchema = new mongoose.Schema({
    poster:{type:[postSchema]},
    photo:{type:[photoSchema]},
    video:{type:[videoSchema]}
    
 
});

module.exports = mongoose.model("media", mediaSchema);

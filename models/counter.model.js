const mongoose=require("mongoose")

const idSchema=new mongoose.Schema({
    admin:{
        type:Number,
        default:1
    },
    hos:{
        type:Number,
       default:1,
       require:true
    },
    vip:{
        type:Number,
        default:1,  
    },
   vipFranchise:{
    type:Number,
    default:1,
    },
   franchise:{
    type:Number,
    default:1,
   },
   branchStaff:{
    type:Number,
    default:1,
    }, 
   });


module.exports=mongoose.model("counts",idSchema);
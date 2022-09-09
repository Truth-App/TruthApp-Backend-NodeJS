const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
   "mobile":Number,
   "email":String,
   "ageCategory":String,
   "gender":String,
   "occupation":String,
   "salvation":Boolean,
   "experience with God":String,
   "userType":{
    type:Number,
    default:1
   },
   "userActive":{
    type:Boolean,
    default:true
   },
   "score":{
    type:Number,
    default:3
   }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

module.exports=User;
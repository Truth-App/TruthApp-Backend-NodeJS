const mongoose = require("mongoose");


const responseSchema = new mongoose.Schema({
    responseID:mongoose.Schema.Types.ObjectId,
    responderID:mongoose.Schema.Types.ObjectId,
    response:{
        type:String,
        required:true
    },
    isApproved:{
      type:Boolean,
      default:false
    },
    reviewerID:mongoose.Schema.Types.ObjectId
},{ timestamps: true })

const Response = mongoose.model('Response',responseSchema);


const questionSchema = new mongoose.Schema({
  questionCreatorID:{
    type:mongoose.Schema.Types.ObjectId
  },
  question:{
    type:String,
    required:true
  },
  type:String,
  reviewerID:mongoose.Schema.Types.ObjectId,
  isPublic:{
    type:Boolean,
    required:true
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  responses:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Response'
   }
  ]
},{timestamps:true})

const Question = mongoose.model('Question',questionSchema);

module.exports={Question, Response};
const mongoose = require("mongoose");



const questionSchema = new mongoose.Schema({
  questionCreatorID:{
    type:mongoose.Schema.Types.ObjectId
  },
  question:{
    type:String,
    required:true
  },
  type:String,
  questionCategory:String,
  reviewerID:mongoose.Schema.Types.ObjectId,
  questionRejectedScore:{
    type:Number,
     default:2
  },
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
      responseRejectedScore:{
        type:Number,
         default:2
      },
      reviewerID:mongoose.Schema.Types.ObjectId,
      timestamps:{
        type:String,
        default:Date.now()
      }
  }
  ]
},{timestamps:true})

const Question = mongoose.model('Question',questionSchema);


module.exports={Question};
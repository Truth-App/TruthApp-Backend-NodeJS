
const { mongoose } = require("mongoose");
const  Question=require("../models/questionSchema");

module.exports.createQuestion = async(req,res)=>{
    try{
        const question = new Question(req.body);
        const response = await question.save();
        console.log("saved",response);
        return res.status(201).json({
            "created":true,
            response
        })
    }
    catch(error){
       console.log(error);
       return res.status(400).json({
        "error":error
       })
    }
}

module.exports.getQuestion = async(req,res)=>{
    try{
        console.log(req.query)
        const response = await Question.find(req.query);
        return res.status(200).json({
            response
        })
    }catch(error){
        console.log(error);
       return res.status(400).json({
        "error":error
       })
    }
}


module.exports.validateQuestion= async (req,res)=>{
    try{
        await Question.findByIdAndUpdate({"_id":req.params.qid},{"isApproved":true});
       return res.status(200).json({
        "update":true
       })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            error
        })
        
    }
}


module.exports.createResponse = async (req,res)=>{
    try{ 
         console.log(req.params.qid)
         const response = await Question.findByIdAndUpdate({"_id": req.params.qid},{
            $push:{
                "responses":req.body
            }
        })
        console.log(response)
        return res.status(200).json({
            "updated":true
        })
    }catch(error){
console.log(error);
return res.json({
    "error":error
})
    }
}

module.exports.validateResponse = async (req,res)=>{
    try{ 
         console.log(req.params.rid)
    
    const response = await Question.find({"responses._id": mongoose.Types.ObjectId(req.params.rid)});


         response[0].responses.map((response=>{
            console.log(response._id == req.params.rid)
             if(response._id == req.params.rid){
                response.isApproved=true;
             }
             if(req.body.reviewerID){
                response.reviewerID = req.body.reviewerID;
             }
         }))
         const updated = new Question(response[0])
         await updated.save();
        return res.status(200).json({
            "updated":updated
        })
    }catch(error){
console.log(error);
return res.json({
    "error":error
})
    }
}

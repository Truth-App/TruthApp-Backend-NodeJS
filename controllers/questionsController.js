
const {Question} =require("../models/questionSchema");

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
       const response = await Question.findByIdAndUpdate({"_id":req.params.qid},{"isApproved":true});
       return res.status(200).json({
        "update":true,
        response
       })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            error
        })
        
    }
}
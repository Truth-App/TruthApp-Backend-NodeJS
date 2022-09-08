
const { mongoose } = require("mongoose");
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
                console.log("yes")
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

// [
//     {
//       _id: new ObjectId("631818c3bf3ce08ae79899f0"),
//       question: 'test q',
//       type: 'personal',
//       isPublic: false,
//       isApproved: true,
//       responses: [
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object]
//       ],
//       createdAt: 2022-09-07T04:06:27.136Z,
//       updatedAt: 2022-09-07T06:42:06.065Z,
//       __v: 0
//     }
//   ]
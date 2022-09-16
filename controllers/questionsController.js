
const { mongoose } = require("mongoose");
const { Question } = require("../models/questionSchema");

module.exports.createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        const response = await question.save();
        console.log("saved", response);
        return res.status(201).json({
            "created": true,
            response
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            "error": error
        })
    }
}

module.exports.getQuestion = async (req, res) => {
    try {
        if(req.query.scoreRange){
            const requireValidation = await Question.find({$and:[{isApproved:false},{questionRejectedScore:{$gt:0}}]})
            return res.status(200).json({
                requireValidation
            })
        }
        const response = await Question.find(req.query);
        return res.status(200).json({
            response
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "error": error
        })
    }
}


module.exports.validateQuestion = async (req, res) => {
    try {
        if (req.body.isApproved) {
            await Question.findByIdAndUpdate({ "_id": req.params.qid }, req.body);
            return res.status(200).json({
                "updated": true
            })
        }
        await Question.updateOne({ _id: req.params.qid }, { $inc: { questionRejectedScore: -1 } })
        return res.status(200).json({
            "updated": true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error
        })

    }
}


module.exports.createResponse = async (req, res) => {
    try {
        console.log(req.params.qid)
        const response = await Question.updateOne({ "_id": req.params.qid }, {
            $push: {
                "responses": req.body
            }
        })
        console.log(response)
        return res.status(200).json({
            "updated": true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            "error": error
        })
    }
}

module.exports.validateResponse = async (req, res) => {
    try {
        const questionDocument = await Question.findOne({"responses._id":req.params.rid})

        if (req.body.isApproved) {
            // const response = await Question.updateOne({ "responses._id": mongoose.Types.ObjectId(req.params.rid) },{$set:{'responses.$[].isApproved':true}});
            questionDocument.responses.map(response=>{
                if(response._id == req.params.rid){
                     response.isApproved=true;
                     response.reviewerID=req.body.reviewerID;
                }
            })
        } else {
            questionDocument.responses.map(response=>{
                if(response._id == req.params.rid){
                     response.responseRejectedScore=response.responseRejectedScore-1;
                     response.reviewerID=req.body.reviewerID;
                }
            })
        }
        
        const toSave = new Question(questionDocument);
            await toSave.save();
            return res.status(200).json({
                "updated": true,
                 toSave
            })
    } catch (error) {
        console.log(error);
        return res.json({
            "error": error
        })
    }
}

const router =require("express").Router();
const {createQuestion, getQuestion, validateQuestion, createResponse, validateResponse} = require("../controllers/questionsController");

//POST - CreateQuestion
router.post("/",createQuestion)

//GET - Questions
router.get("/",getQuestion);

//PUT -Validate
router.put("/:qid/validate-question", validateQuestion)

//PATCH - Create Response
router.put("/:qid/create-response",createResponse);

//PATCH - Update Response
router.patch("/:rid/validate-response",validateResponse)

module.exports=router;
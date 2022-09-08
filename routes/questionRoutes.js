const router =require("express").Router();
const {createQuestion, getQuestion, validateQuestion, createResponse, validateResponse} = require("../controllers/questionsController");

//POST - CreateQuestion
router.post("/create",createQuestion)

//GET - Questions
router.get("/",getQuestion);

//POST -Validate
router.post("/validate/:qid", validateQuestion)

//PATCH - Update Response
router.patch("/create-response/:qid",createResponse)

//PATCH - Update Response
router.patch("/validateResponse/:rid",validateResponse)

module.exports=router;
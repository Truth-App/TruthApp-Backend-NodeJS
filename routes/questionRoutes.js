const router =require("express").Router();
const {createQuestion, getQuestion, validateQuestion} = require("../controllers/questionsController");

//POST - CreateQuestion
router.post("/create",createQuestion)

//GET - All Questions Feed
router.get("/",getQuestion);

//POST
router.post("/validate/:qid", validateQuestion)

module.exports=router;
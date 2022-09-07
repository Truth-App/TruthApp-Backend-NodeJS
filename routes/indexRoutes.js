const router = require("express").Router();

router.use("/questions", require("./questionRoutes"));

module.exports=router;

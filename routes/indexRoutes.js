const router = require("express").Router();

router.use("/questions", require("./questionRoutes"));

router.use("/user",require("./userRoutes"));


module.exports=router;

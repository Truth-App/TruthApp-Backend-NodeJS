const router = require("express").Router();
const {createUser, getUser, removeUser, updateUser} =require("../controllers/userController");

//POST = create user
router.post("/create",createUser);

//GET - user
router.get("/", getUser);

//PATCH - user
router.patch("/update/:uid",updateUser);

//DELETE - user
router.delete("/remove/:uid", removeUser)

module.exports=router;

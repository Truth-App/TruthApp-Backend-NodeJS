const User = require("../models/userSchema");

module.exports.createUser = async(req,res)=>{
   try{
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
        createdUser:true
    })
   }
   catch(error){
    console.log(error);
    return res.status(400).json({
        error
    })
   }
}

module.exports.getUser = async(req,res)=>{
    try{
         console.log(req.query);
         const responseUser = await User.find(req.query);
         return res.status(200).json({
            responseUser
         })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            error
        })
    }
}


module.exports.removeUser= async(req,res)=>{
    try {
        const userRemoved = await User.findByIdAndDelete(req.params.uid);
        if(!userRemoved){
            return res.status(400).json({
                "message":"user does not exist"
            })
        }
        return res.status(200).json({
            removedUser:req.params.uid
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error
        })      
    }
}

module.exports.updateUser = async(req,res)=>{
    try{
          const updatedUser = await User.findByIdAndUpdate({_id:req.params.uid},req.body);
          if(!updatedUser){
            return res.status(400).json({
                "message":"user does not exist"
            })
          }
          console.log(updatedUser)
          return res.status(201).json({
            userUpdate:true
          })
    } catch(error){
        console.log(error);
        return res.status(400).json({
            error
        })
    }
}
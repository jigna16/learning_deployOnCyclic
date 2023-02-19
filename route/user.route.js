const express=require("express")
const { UserModel } = require("../model/user.model")
const bcrypt=require("bcrypt")
require('dotenv').config()
const jwt=require("jsonwebtoken")

const userRouter=express.Router()


//for registering your detAILS
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        bcrypt.hash(pass, 5, async(err, hashed)=> {
            if(err){
                res.send({"msg": "getting error while hashing","err":err.message})
                console.log(err)
                
            }else{
                const user= await new UserModel({name,email,pass:hashed,age})
                 user.save()
                res.send("details has been registered")
            }
        });

    }catch(err){
        res.send({"msg": "details can't be registered","err":err.message})
    }
    
})


//for logging in  your detAILS
userRouter.post("/login",async(req,res)=>{
   const {email,pass}=req.body
   const user= await  UserModel.find({email})
   try{
    if(user.length>0){
        bcrypt.compare(pass, user[0].pass, (err, result) =>{
           if(result){
            const token = jwt.sign({ userID: user[0]._id }, 'masai');
            res.send({"msg": "you are logged ibackendn","token":token})
           }else{
            res.send({"msg": "wrong credentials","err":err.message})
           }
        });
    }
   }catch(err){
    res.send({"msg": "wrong credentials","err":err.message})

   }

})



//for logging in  your detAILS
userRouter.get("/",async(req,res)=>{
    try{
        const show=await UserModel.find()
        res.send(show)

    }catch(err){
        res.send({"msg": "details can't be registered","err":err.message})
        console.log({"msg": "details can't be registered","err":err.message})
    }
})






module.exports={
    userRouter
}
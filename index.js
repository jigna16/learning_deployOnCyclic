const express=require("express")
const { connection } = require("./db")
const {authenticate}=require("./middleware/authenticate.middleware")
const app=express()
const cors=require("cors")
app.use(cors())


const {userRouter}=require("./route/user.route")
const {noteRouter}=require("./route/note.route")
app.use(express.json())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)
require('dotenv').config()




app.listen(`${process.env.port}`,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log(" can't connect to db")
    }
    console.log("running on 2000")
})


// {  
//     "title": "title1",
//     "note": "note1",
//     "category":45,
//     "author":"author" 
// }


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Vyc2UiOiJiYWNrZW5kIiwiaWF0IjoxNjc2ODAwNjIzLCJleHAiOjE2NzY4MDQyMjN9.U8HcQl1Uz9Mk8elfAhw2SUtN2_krjKRH4dfAVHPFYnE
const express=require("express")
const { NoteModel } = require("../model/note.model")


const noteRouter=express.Router()


//for registering your detAILS
noteRouter.get("/",async(req,res)=>{
    try{
        const note=await NoteModel.find()
        res.send(note)
    }catch(err){
        res.send({"msg":"something went wrong while getting notes","err":err.message})

    }

})


//for creating notes 
noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.send("note is created")

    }catch(err){
    res.send({"msg":"note is not created","err":err.message})
    }
})


//for updating notes
noteRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorised to update this note","err":err.message})  
            
        }else{
            await  NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send({"msg":"note has been updated"})
        }
    
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong","err":err.message})  
    }
})



//for deleting any note
noteRouter.delete("/:id",async(req,res)=>{
    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorised to delete this note","err":err.message})  
            
        }else{
            await  NoteModel.findByIdAndDelete({_id:id})
            res.send({"msg":"note has been deleted"})
        }
    
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong","err":err.message})  
    }
})



module.exports={
    noteRouter
}
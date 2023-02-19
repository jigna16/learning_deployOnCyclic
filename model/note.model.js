const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:{type:String,required:true},
    note:{type:String,required:true},
    category:{type:String,required:true},
    userID:{type:String}
 
   
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}
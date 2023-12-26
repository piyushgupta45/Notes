import mongoose from 'mongoose'

 const NoteSchema=mongoose.Schema(
    {
       content:{
        type:String,
       },
     },
     {
        timestamps:true,
     }
);

export const Note=mongoose.model('Note',NoteSchema)
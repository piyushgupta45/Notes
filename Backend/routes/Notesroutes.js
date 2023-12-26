import express from "express"
import {Note} from '../models/Notemodel.js'
const router=express.Router()


router.post('/',async(req,res)=>{
    console.log('requeested')
    console.log(req.body.content)
    try{
        
        const newNote={
         content:req.body.content,
        };
        const createdNote=await Note.create(newNote);
        return res.status(200).send(createdNote)
    }
    
    catch(error){
       
     console.log(error.message);
     res.status(500).send({message: error.message})
    }
 })
 router.get('/',async(req,res)=>{
     try{
         const Notes= await Note.find();
         return res.status(200).json(Notes);
         
     }
     catch(error){
     console.log(error.message)
     res.status(500).send({message: error.message})
     }
 })

 router.put('/:id',async(req,res)=>{
     try{
         
         const {id}=req.params;
         const result= await Note.findByIdAndUpdate(id,req.body);
         if(!result)
         {
             return res.status(404).json({message:'book not found'})
         }
         return res.status(200).json({message:'book updated'});
     }
     catch(error){
        console.log('dd')
     console.log(error.message)
     res.status(500).send({message: error.message})
     }
 })
 router.delete('/:id',async(req,res)=>{
    
     try{
          const {id}=req.params;
          const result=await Note.findByIdAndDelete(id)
 
          if(!result)
         {
             return res.status(404).json({message:'book not found'})
         }
         return res.status(200).json({message:'book deleted'});
     }
     catch(error){
         console.log(error.message)
         res.status(500).send({message: error.message})
         }
 })

 export default router;
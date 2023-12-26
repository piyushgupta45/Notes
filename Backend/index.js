import express from 'express'
import mongoose from 'mongoose'
import Notesroutes from './routes/Notesroutes.js'
import cors from 'cors'


const mongoDBURL="mongodb+srv://piyushguptapg1704:piyush123@cluster0.xyfevwg.mongodb.net/?retryWrites=true&w=majority"
const app=express()
app.use(express.json())
app.use(cors())

app.use('/notes',Notesroutes)

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('Connected to database')
    app.listen(5000,()=>{
        console.log('App is listening on port 5000....')
    })  
})
.catch((error)=>{
    console.log(error)
})
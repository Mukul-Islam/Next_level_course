import express, { type Request, type Response } from 'express';
import config from './config';

const app = express()

// app.use(express.)

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"root route are successfully worked"
    })
})
app.listen(config.port,()=>{
    console.log("server is creating!!");
})
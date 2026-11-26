import express, { type Request, type Response } from 'express';
import {  pool } from './db';
import { userRoute } from './modules/users/user.route';
import { profileRoute } from './modules/profiles/profile.route';

 const app = express()




// app.use(express.)

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"root route are successfully worked"
    })
})

app.use(express.json())

app.use("/api/v1/users",userRoute);

app.use("/api/v1/profiles",profileRoute);


export default app;
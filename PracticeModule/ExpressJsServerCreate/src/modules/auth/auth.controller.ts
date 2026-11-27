import type { Request, Response } from "express";
import { loginService } from "./auth.service";

const createLogin = async(req:Request,res:Response)=>{
    try {
        // console.log(req.body)
    const result =await loginService.createLoginFromDB(req.body);

      res.status(200).json({
            success:true, 
            message:"Login successfully",
            data:result
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false, 
            message:error?.message,
            error:error
        })
    }
}


export const loginController = {
    createLogin
}
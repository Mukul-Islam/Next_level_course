import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
import type { Role } from "../types";



const auth =(...roles :Role[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            
        console.log(roles)

    //1-> Check if the token exist
    // 2-> Verify Token
    // 3-> Check if the user eists
    //4-> is the user status active



        // console.log(req.headers.authorization)
        const token =req.headers.authorization;
        if(!token){
            res.status(401).json({
                success:false,
                message:"Unauthorized access!!"
            });
        }

        const decode = jwt.verify(token as string,config.jwt_secret) as JwtPayload

        // console.log(decode)
         
        const user = await pool.query(`
            select * from users where email =$1
            `,[decode.email])

            // console.log(user.rows[0])
    if(user.rowCount===0){
      return  res.status(404).json({
            success:false,
            message:"User not found!!"
        });
    }

     if(user.rows[0].is_Active){
       return res.status(403).json({
            success:false,
            message:"forbidden!!"
        });
    }

    if(roles.length && !roles.includes(user.rows[0].role)){
      return  res.status(401).json({
            success:false,
            message:"Unauthorized access!!"
        });
    }


    req.user = decode;

    // console.log(req.user)
    next();
        } catch (error) {
            next(error)
        }
};

}
export default auth
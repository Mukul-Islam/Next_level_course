import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";

const auth =()=>{
    // amra abar notun kore ken banailam karon ekhane role nirdharon korte
    return async(req:Request,res:Response,next:NextFunction)=>{
    // console.log("This is protected route!");
    // console.log(req.headers.authorization)

    // check if the token have exist
    // token take veryfy koreci
    // check the user if exist
    // is the user status active
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            success:false,
            message:"Unauthorized access",
        });
    }

    // ebar check korte hobe token ta valid kina ekhan theke suru

    const decode = jwt.verify(token as string,config.SECRET_KEY) as JwtPayload; 

    const user = await pool.query(`
        select *from users2 where email = $1;
        `,[decode.email])
    //  console.log(user.rows[0])

    if(user.rowCount === 0){
        res.status(402).json({
            success:false,
            message:"User not found!!"
        })
    }

     if(!user.rows[0].is_active){
        res.status(403).json({
            success:false,
            message:"forbidden"
        })
    }

    req.user = decode
    // console.log(req.body)
    next();
}
}
export default auth;
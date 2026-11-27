import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { LUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";


const createLoginFromDB = async(payload:LUser)=>{

    //check if the user exists
    // check if the password match
    // check the user status
    // if pass all then generate     jwt  token

    const {email,password} = payload;

    const user = await pool.query(`
        select *from users2 where email = $1
        `,[email])
    // console.log(user.rows[0])
    if(user.rowCount === 0){
        throw new Error("Emails not available");
    }

    const matchPassword = await bcrypt.compare(password,user.rows[0].password)

     if(!matchPassword){
        throw new Error("Invalid Credential");
    }

    if(!user.rows[0].is_active){
        throw new Error("access Denied ");
    }

    const jwtPayLoad = {
        id:user.rows[0].id,
        name:user.rows[0].name,
        email:user.rows[0].email
    };

    const accessToken = jwt.sign(jwtPayLoad,config.SECRET_KEY,{
        expiresIn:"1d",
    });
    delete user.rows[0].password
    return {accessToken, user:user.rows[0]}

}
export const loginService = {
    createLoginFromDB
}
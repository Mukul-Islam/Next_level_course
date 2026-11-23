import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";


const loginUserIntoDB = async(payload:{email:string;password:string})=>{

    //check if the user exists
    //check if the password match
    // check the user status 
    //if pass all then generate JWT token

    const {email,password} = payload;

    const user = await pool.query(`
        select * from users where email = $1
        `,[email]
    );

    
    if (user.rowCount === 0){
        throw new Error("Invalid credentials!!");
    }


     const matchPassword = await bcrypt.compare(password,user.rows[0].password)


    if (!matchPassword){
        throw new Error("Invalid credentials!!");
    }

    if (!user.rows[0].is_active){
        throw new Error("Access denied!!");
    }


    const jwtPayload = {
        id:user.rows[0].id,
        name:user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
        
    }
    const accessToken = jwt.sign(jwtPayload,config.jwt_secret ,{
        expiresIn:"1d",
    }
)
return {accessToken,user: user.rows[0]};
   
        
        // console.log(user);
}

export const authService = {
    loginUserIntoDB
}
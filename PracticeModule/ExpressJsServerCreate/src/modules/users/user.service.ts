import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";


const createUserIntoDB = async(payLoad:IUser)=>{
      // console.log(req.body)
    const {name,email,password,age,role} = payLoad;
    const hashPassword = await bcrypt.hash(password,10);
    // console.log(hashPassword)

    const result = await pool.query(`
        
        insert into users2 (name,email,password,age,role) values 
        ($1,$2,$3,$4,coalesce($5, 'user')) returning *
        `,[name,email,hashPassword,age,role]);

      delete result.rows[0].password
        return result;
}

const getALlUsersIntoDB =async ()=>{
      // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo

   const result =await pool.query(`
        select *from users2;
        `)
        return result
        // console.log(result)
}

const getSingleUsersFromDB = async(id:string)=>{
      const result =await pool.query(`
        select *from users2 where id = $1
        `,[id])
        // console.log(result)
        return result;
}

const updateUserFromDB = async(id:string,payLoad:IUser)=>{
     const {name,age,password,is_active} = payLoad
    // console.log(id)
   const result =await pool.query(`

    update users2
    set
    name = coalesce($1,name),
    password = coalesce($2,password),
    age = coalesce($3,age),
    is_active = coalesce($4,is_active),
    updated_at = now()
    where id = $5 returning *

        `,[name ?? null,password?? null,age?? null,is_active??null,id])
        // console.log(result)

        return result;

}

const deleteUserFromDB = async(id:string)=>{
      const result =await pool.query(`
    
    delete from users2 where id = $1
    
    `,[id])
    return result
        // console.log(result)
}

export const userService = {
    createUserIntoDB,getALlUsersIntoDB,getSingleUsersFromDB,updateUserFromDB,deleteUserFromDB
}
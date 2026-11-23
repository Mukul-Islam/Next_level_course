import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser, UUser } from "./user.interface";

const crateUserIntoDB = async (payLoad:IUser)=>{

     const { name, age, email, password,role } = payLoad;

     const hashPassword = await bcrypt.hash(password,10);
    //  console.log("hasH",hashPassword)

    const result = await pool.query(
      `
        insert into users (name,email,password,age,role) values ($1,$2,$3,$4,COALESCE($5, 'user')) returning *`,
      [name, email, hashPassword, age,role],
    );

    delete result.rows[0].password;
    // console.log(result);
    return result;
};

const getAllUsersFromDB =async ()=>{
     const result = await pool.query(`
        select * from users
        `);
        return result;
}

const getSingleUserFromDB = async (id:string)=>{
     //? nicher vabeo likha jai
    // const id = req.params.id;

    
    const result = await pool.query(
      `
            select * from users where id = $1
            `,
      [id],
    );
    return result
}

const updateUserFromDB = async(payLoad:UUser,id:string)=>{

   
    const { name, password, age, is_Active } = payLoad;
    const result = await pool.query(
      `
        
            update users 
            set
            name = coalesce($1, name),
            password = coalesce($2, password),
            age = coalesce($3, age),
            is_Active = coalesce($4, is_Active),
            updated_at = now()
            where id = $5 returning *
        `,
      [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
    );
    return result;
}

const deleteUserFromDB = async(id:string)=>{
     const result = await pool.query(
      `
            delete from users where id = $1
            `,
      [id],
    );
    return result
}

export const userService = {
    crateUserIntoDB,getAllUsersFromDB,getSingleUserFromDB,updateUserFromDB,deleteUserFromDB
}
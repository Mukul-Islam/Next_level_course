import { pool } from "../../db";

const createProfileIntroDB = async(payload:any)=>{
    const {user_id,bio,address,phone,gender} = payload;

    const user = await pool.query(`
        select *from users where id=$1
        `,[user_id],
    );


    if(user.rowCount===0){
        throw new Error("User not exist in the database!!")
    }

    const result = await pool.query(`
        insert into profile (user_id,bio,address,phone,gender) values
        ($1,$2,$3,$4,$5)
        returning *
        `,
        [user_id,bio,address,phone,gender]
    );
    return result;
}

export const profileService ={
    createProfileIntroDB
}
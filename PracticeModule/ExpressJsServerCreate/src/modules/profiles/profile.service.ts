import { pool } from "../../db";

const createProfileFromDB = async(payLoad:any)=>{

    

    const {user_id,bio,address,phone,gender} = payLoad;

    const user = await pool.query(`
        
        select *from users2 where id = $1
        
        `,[user_id]);

    if(user.rowCount === 0){
        throw new Error("User not exist in the database");
    }

    


       const result =  await pool.query(`
           insert into profile (user_id,bio,address,phone,gender) values
           ($1,$2,$3,$4,$5) returning *
            `,[user_id,bio,address,phone,gender])   
            
        return result;
    
}

export const profileService = {
    createProfileFromDB
}
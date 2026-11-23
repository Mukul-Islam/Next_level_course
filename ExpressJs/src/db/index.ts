// import { config } from "dotenv";
import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString:
    config.connection_string,
});

// console.log(pool)

//? async / await keno use korci
export const initDB = async () => {
  try {
    await pool.query(`
        create table if not exists users(
        id serial primary key,
        name varchar(255),
        email varchar(255) unique not null,
        password varchar(255) not null,
        age int,
        is_Active boolean default true,
        role varchar(20) default 'user',

        created_at timestamp default now(),
        updated_at timestamp default now()

        );  
        `);

        await pool.query(`
            
           create table if not exists profile(
           id serial primary key,
           user_id int unique references users(id) on delete cascade,

           bio text,
           address text,
           phone varchar(15),
           gender varchar(15),

           created_at timestamp default now(),
        updated_at timestamp default now()
           ) 
            `)
    console.log("Database conneted");
  } catch (error) {
    console.log(error);
  }
};
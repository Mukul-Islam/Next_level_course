import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString:config.connection_string
})

export const initDB = async ()=>{
    try {
       await pool.query(`
            create table  if not exists users2(
            id serial primary key,
            name varchar(255),
            email varchar (255) unique not null,
            password varchar(255) not null,
            age int,
            is_active boolean default true,
            created_at timestamp default now(),
            updated_at timestamp default now()
            );
            `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,

        user_id INT UNIQUE REFERENCES users2(id)
        ON DELETE CASCADE,

        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(15),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);
    } catch (error) {
        throw Error("error hoise tha")
    }
}
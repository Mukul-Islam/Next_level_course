import express, { type Request, type Response } from 'express';
import {Pool} from "pg"
import config from './config';
const app = express();
// const port = 5000;


const pool = new Pool({
    connectionString:config.connection_string
});

// console.log(pool)

const initDB = async ()=>{
    try {
        pool.query(`
           create table if not exists users(
           id serial primary key,
           name varchar(255) ,
           email varchar(255) unique not null,
           password varchar(255) not null,
           age int,
           is_Active boolean default true,
           created_at TIMESTAMP default now(),
           updated_at TIMESTAMP default now()
           ) ;
            `);        
    } catch (error) {
        console.log(error)
    }
}
initDB();
app.get("/",(req:Request,res:Response)=>{
    // res.send("hello world")

    // console.log(res)
    
    res.status(200).json({
        success:true,
        message:"this is a message",

    })

});

// we need a middleware

app.use(express.json())

app.post("/api/v1/users",async(req:Request,res:Response)=>{
    // console.log(req.body)
  try {
      const {name,email,password,age} = req.body;
    const result = await pool.query(`
        
        insert into users (name,email,password,age) values 
        ($1,$2,$3,$4) returning *
        `,[name,email, password,age]);
        console.log(result)


    res.status(201).json({
        success:true,
        message:"User created",
        // data:{name,age}
        // data:body
        data:result.rows
    });
  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error?.message,
        error:error
        // data:{name,age}
        // data:body
        // data:result.rows
    });
    
  }
});

app.get("/api/v1/users",async(req:Request,res:Response)=>{
    try {

        const result =await pool.query(`
            select *from users
            
            `)
            // console.log(result)
         res.status(200).json({
        success:true,
        message:"Users retrieved successfully",
        // data:{name,age}
        // data:body
        data:result.rows
    });
        
    } catch (error:any) {
         res.status(500).json({
        success:false,
        message:error?.message,
        error:error
        // data:{name,age}
        // data:body
        // data:result.rows
    });
    }
})

app.get("/api/v1/users/:id",async(req:Request,res:Response)=>{
    try {

        const {id} = req.params;
        const result =await pool.query(`
            select *from users
            where id =$1 
            
            `,[id])
            // console.log(result)
         res.status(200).json({
        success:true,
        message:"Single Users successfully",
        // data:{name,age}
        // data:body
        data:result.rows
    });
        
    } catch (error:any) {
         res.status(500).json({
        success:false,
        message:error?.message,
        error:error
        // data:{name,age}
        // data:body
        // data:result.rows
    });
    }
})

app.listen(config.port,()=>{
    console.log("the server is running")
});
import express, { type Request, type Response } from 'express';
import config from './config';
import {Pool} from "pg"

const app = express()

const pool = new Pool({
    connectionString:config.connection_string
})

const initDB = async ()=>{
    try {
        pool.query(`
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
    } catch (error) {
        console.log(error)
    }
}
initDB()


// app.use(express.)

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"root route are successfully worked"
    })
})

app.use(express.json())

app.post("/api/v1/users",async(req:Request,res:Response)=>{
    // console.log(req.body)
    const {name,email,password,age} = req.body;

    const result = await pool.query(`
        
        insert into users2 (name,email,password,age) values 
        ($1,$2,$3,$4) returning *
        `,[name,email,password,age]);

        res.status(200,).json({
            success: true,
            message:"Users2 created successfully",
            data:result
        });
    
})


app.get("/api/v1/users",async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo

   const result =await pool.query(`
        select *from users2;
        `)
        // console.log(result)

    try {
        res.status(200).json({
            success:true,
            message:"all users are getting successfully",
            data:result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            data:error
    })
}})


app.get("/api/v1/users/:id",async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    

    const {id} = req.params
    // console.log(id)
   const result =await pool.query(`
        select *from users2 where id = $1
        `,[id])
        // console.log(result)

    try {

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"single users are getting successfully",
            data:result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            data:error
    })
}
})

app.put("/api/v1/users/:id",async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    
    const {name,age,password,is_active} = req.body
    const {id} = req.params
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

    try {

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"single users are getting successfully",
            data:result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            data:error
    })
}
})


app.delete("/api/v1/users/:id",async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    

    const {id} = req.params
    // console.log(id)
   const result =await pool.query(`
    
    delete from users2 where id = $1
    
    `,[id])
        // console.log(result)

    try {

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"users deleted successfully",
            // data:result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"deleting are not okay",
            error:error
    })
}
})




app.listen(config.port,()=>{
    console.log("server is creating!!");
})
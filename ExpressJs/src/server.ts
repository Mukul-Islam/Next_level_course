import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";



const app: Application = express();
const port = 3000;


app.use(express.json());
app.use(express.text());

//?amra body te kono value pai nai karon amra middleware use kori nai ..
//? middleware use korte gele obossoi app.use() use korte hobe

//!ekhane amra extended:true ken korlam
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_5IRC3XnGVvsj@ep-lingering-field-aofnicp7.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
})

// console.log(pool)

//? async / await keno use korci
const initDB = async()=>{
    try {
        await pool.query(`
        create table if not exists users(
        id serial primary key,
        name varchar(255),
        email varchar(255) unique not null,
        password varchar(255) not null,
        age int,
        is_Active boolean default true,
        
        created_at timestamp default now(),
        updated_at timestamp default now()

        );  
        `);
        console.log("Database conneted")
    } catch (error) {
        console.log(error)
    }
}
initDB()


app.get("/", (req: Request, res: Response) => {
  //   res.send('Hello World!')
  res.status(200).json({
    success: "true",
    message: "this is root route",
    author: "peter",
  });
});



//! ar ekhane async ken korlam
app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {
          // console.log(req.body);
  // const body = req.body;
  const { name, age,email, password } = req.body;

    const result = await pool.query(`
        insert into users (name,email,password,age) values ($1,$2,$3,$4) returning *`,[name,email,password,age])
    console.log(result)

//   console.log(password);
  res.status(201).json({
    success: "true",
    message: "User created",
    // data:body,
    // data: { name, age },
    data:result.rows[0]
  });
    } catch (error:any) {
        res.status(500).json({
    success: false,
    message: error?.message,
    // data:body,
    // data: { name, age },
    data:error
  });
    }
});

app.get("/api/v1/users",async(req:Request,res:Response)=>{
   try {
    const result = await pool.query(`
        select * from users
        `);
        // console.log(result)
    res.status(200).json({
    success: true,
    message: "Users fetching successfully",
    data:result.rows,
   });
   } catch (error:any) {
     res.status(500).json({
    success: false,
    message: error?.message,
    // data:body,
    // data: { name, age },
    error:error,
   });
}
});

app.get("/api/v1/users/:id",async(req:Request,res:Response)=>{
    try {
        //? nicher vabeo likha jai
        // const id = req.params.id;

        const {id} =req.params;
        const result = await pool.query(`
            select * from users where id = $1
            `,[id])
            // console.log(result)
    res.status(201).json({
    success: "true",
    message: "User created",
    // data:body,
    // data: { name, age },
    data:result.rows[0]
  });
    } catch (error:any) {
         res.status(500).json({
    success: false,
    message: error?.message,
    // data:body,
    // data: { name, age },
    error:error,
   });
    }
});

app.put('/api/v1/users/:id',async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const {name,password,age,is_Active} = req.body;

        const result = await pool.query(`
        
            update users 
            set
            name = coalesce($1, name),
            password = coalesce($2, password),
            age = coalesce($3, age),
            is_Active = coalesce($4, is_Active),
            updated_at = now()
            where id = $5 returning *
        `,[name?? null,password??null,age??null,is_Active??null,id]
    );
    // console.log(result);

    res.status(200).json({
    success: "true",
    message: "User Updated Successfully",
    // data:body,
    // data: { name, age },
    data:result.rows[0]
  });

    } catch (error:any) {
        res.status(500).json({
    success: false,
    message: error?.message,
    // data:body,
    // data: { name, age },
    error:error,
   });
    }
}); 

app.delete("/api/v1/users/:id", async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const result = await pool.query(`
            delete from users where id = $1
            `,[id]);
    res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    // data:body,
    // data: { name, age },
    // data:result.rows[0]
  });
        
    } catch (error:any) {
    res.status(500).json({
    success: false,
    message: error?.message,
    // data:body,
    // data: { name, age },
    error:error,
   });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

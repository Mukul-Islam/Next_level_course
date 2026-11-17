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
    connectionString:"postgresql://neondb_owner:npg_5IRC3XnGVvsj@ep-lingering-field-aofnicp7.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

console.log(pool)


app.get("/", (req: Request, res: Response) => {
  //   res.send('Hello World!')
  res.status(200).json({
    success: "true",
    message: "this is root route",
    author: "peter",
  });
});



//! ar ekhane async ken korlam
app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);
  // const body = req.body;
  const { name, age, password } = req.body;
//   console.log(password);
  res.status(200).json({
    success: "true",
    message: "This is a test Api",
    // data:body,
    data: { name, age },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

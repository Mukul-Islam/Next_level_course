import express, {
    Router,
  type Application,
  type Request,
  type Response,
} from "express";
// import { Pool} from 'pg';
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.routes.";


const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(express.text());

//?amra body te kono value pai nai karon amra middleware use kori nai ..
//? middleware use korte gele obossoi app.use() use korte hobe

//!ekhane amra extended:true ken korlam
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
  //   res.send('Hello World!')
  res.status(200).json({
    success: "true",
    message: "this is root route",
    author: "peter",
  });
});

app.use("/api/v1/users", userRoute)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth",authRoute)
//! ar ekhane async ken korlam


export default app
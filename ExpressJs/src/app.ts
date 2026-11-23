import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.routes.";

import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors"



const app: Application = express();
// const port = 3000;

const corsOptions = {
    origin:["http://localhost:3000"],
    optionsSuccessStatus:200,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.text());
//!ekhane amra extended:true ken korlam
app.use(express.urlencoded({ extended: true }));


//?amra body te kono value pai nai karon amra middleware use kori nai ..
//? middleware use korte gele obossoi app.use() use korte hobe

app.use("/api/v1/users", userRoute)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth",authRoute)
app.use(logger)
//! ar ekhane async ken korlam




app.get("/", (req: Request, res: Response) => {
  //   res.send('Hello World!')
  res.status(200).json({
    success: "true",
    message: "this is root route",
    author: "peter",
  });
});


app.use(globalErrorHandler);

export default app
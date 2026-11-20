import express, { type Request, type Response } from "express";
const app = express();
const port = 7000;

app.get("/", (req: Request, res: Response) => {
  // res.send("response send");
  try {
    res.status(200).json({
      success: true,
      message: "will get the product",
      author: "nothing",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Message not showing",
      // author:"nothing"
    });
  }
});

app.use(express.json())

app.post("/", (req: Request, res: Response) => {
    const body = req.body
    console.log(body)
});

app.listen(port, () => {
  console.log("the app is running");
});

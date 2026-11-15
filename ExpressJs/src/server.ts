import express, { type Request, type Response } from "express"
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
res.status(200).json({
    success:"true",
    message:"this is root route",
    author:"peter"
})
})

app.use(express.json());
app.use(express.text());


//!ekhane amra extended:true ken korlam
app.use(express.urlencoded({extended:true}))


//! ar ekhane async ken korlam 
app.post("/",async(req:Request,res:Response)=>{
    // console.log(req.body);
    const body = req.body;
    res.status(200).json({
    success:"true",
    message:"This is a test Api",
    data:body,
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
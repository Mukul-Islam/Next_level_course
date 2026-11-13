import { createServer, IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";

const server = createServer((req:IncomingMessage , res:ServerResponse) =>{
    console.log(req)
   routeHandler(req,res);
   
})
server.listen(5000,()=>{
    console.log("server is running");
    console.log("so server is going to war!!")
})
import { createServer, IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";
import config from "./config";

const server = createServer((req:IncomingMessage , res:ServerResponse) =>{
    // console.log(req)
   routeHandler(req,res);
   
})
server.listen(config.port,()=>{
    console.log(`server is running on the port ${config.port}`);
    
})
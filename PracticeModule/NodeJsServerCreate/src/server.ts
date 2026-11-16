import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server: Server = createServer((req:IncomingMessage,res:ServerResponse)=>{
    const url = req.url;
    const method = req.method;

    if(url==="/" && method ==="GET"){
        res.writeHead(200,{
            "content-type":"text/plain"
        
        })
        res.end("THis is root endPoint");
    }
        else{
            res.writeHead(404,{
                "content-type":"application/json"
            })
            res.end(JSON.stringify({message:"server is not found"}));
        }
})

server.listen(4000,()=>{
    console.log("server is running")
})
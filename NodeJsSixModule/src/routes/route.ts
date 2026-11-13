import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controller/product.controller";

const routeHandler = (req:IncomingMessage , res:ServerResponse)=>{
     const url = req.url;
    const method = req.method;

    // console.log(url)

     if(url === "/" && method === "GET"){
        // console.log("this is route ")
        res.writeHead(200,{
            // "content-type": "text/plain"
            "content-type":"application/json"
        });
        res.end(JSON.stringify({message:"This is root Route"}));

    }
    else if(url?.startsWith("/products")){
       productController(req,res);
    }
    else{
        // console.log("this is route not defined")
        res.writeHead(404,{
            // "content-type":"text/plain"
            "content-type":"application/json"
        });
        res.end("404 ERROR");
    }
}

export default routeHandler;
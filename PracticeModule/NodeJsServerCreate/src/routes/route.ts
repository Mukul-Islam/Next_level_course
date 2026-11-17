import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";
import { productService } from "../service/product.service";
// import productService from "../service/product.service";

const routeHandler = (req:IncomingMessage,res:ServerResponse)=>{

    const url = req.url;
    const method = req.method;

    // console.log(method)
      productService();
    if (url === "/" && method === "GET") {
         
      res.writeHead(200, {
        "content-type": "text/plain",
      });
      res.end("THis is root endPoint");
    } else if (url?.startsWith("/products")) {
      productController(req,res);
    } else {
      res.writeHead(404, {
        "content-type": "text/plain",
      });
      res.end(JSON.stringify({ message: "server is not found" }));
    }
  
}

export default routeHandler;
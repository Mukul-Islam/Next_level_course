import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { Iproduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    // console.log(url)
    const urlParams = url?.split("/");
    // console.log(urlParams);//[ '', 'products', '1' ]
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
    // console.log(id)

    if(url === "/products" && method ==="GET"){
        const products = productService();
  res.writeHead(200, {
    "content-type": "application/json",
  });
  res.end(
    JSON.stringify({ 
    message: "Products retrived successfully!", 
    data: products }));

    }
    else if(method ==="GET" && id!==null){
    const products = productService();
    const product = products.find((p:Iproduct)=>p.id === id)
    
  res.writeHead(200, {
    "content-type": "application/json",
  });
  res.end(
    JSON.stringify({ 
    message: "Products retrived successfully!", 
    data: product }));
    }

    else if(method === "POST" && url ==="/products"){
    
    const body =await bodyParser(req);
    console.log(body)
        res.writeHead(201, {
    "content-type": "application/json",
  });
  res.end(
    JSON.stringify({ 
    message: "Products retrived successfully!", 
    // data: product 
}),
);
    
    // console.log(url);
  //   const product = [
  //     {
  //       id: 1,
  //       name: "product-1",
  //       price: 20,
  //     },
  //     {
  //       id: 2,
  //       name: "product-2",
  //       price: 30,
  //     },
  //   ];
  
}};

export default productController;

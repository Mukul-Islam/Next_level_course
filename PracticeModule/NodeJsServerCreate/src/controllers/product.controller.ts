import type { IncomingMessage, ServerResponse } from "http";
import  {productService, createProduct } from '../service/product.service';
import type { Iproduct } from "../types/iProduct";
import { bodyParser } from "../utils/parseBody";

const productController = async(req: IncomingMessage, res: ServerResponse) => {
//   const data = [
//     {
//       name: "mukul",
//       price: 230,
//     },
//     {
//         name:"bokul",
//         price:2345
//     },
//     {
//         name:"momin",
//         price:3523523
//     }
//   ];
   
const url = req.url;
const method = req.method;

const urlParams = url?.split("/")
const id = urlParams && urlParams[1]=== "products" ? Number(urlParams[2]):null
// console.log(id)

if(url==="/products" && method ==="GET"){
    const products =  productService();
    res.writeHead(200, {
    "content-type": "application/json",

  });
  res.end(
    JSON.stringify({
      message: "this is products route",
      data:products,
    }),
  );
}else if(method === "GET" && id !==null){

    const products =  productService();
    const product = products.find((p:Iproduct)=>(p.id === id))
    console.log(products)

    res.writeHead(200,{
        "content-type":"application/json"
         
    })
    res.end(JSON.stringify({
        message:"Products retrieved successfully",
        data:product,
    }))

}else if(method === "POST" && url=== "/products"){


    const products =  productService();
    const body =await bodyParser(req);
    // console.log(body)
    const newProduct = {
        id:Date.now(),
        ...body
    }
    // console.log(newProduct)
    products.push(newProduct);

    createProduct(products);

    res.writeHead(201,{
        "content-type":"application/json"
         
    })
    res.end(JSON.stringify({
        message:"Products created successfully",
        // data:product,
    }))
}else if(method ==="PUT" && id!==null){

    
    const products =  productService();
    const body =await bodyParser(req);
    // console.log(body)
    const index = products.findIndex((p:Iproduct)=>p.id ===id);
    // console.log(index);
    if(index<0){
         res.writeHead(404,{
        "content-type":"application/json"
         
    })
    res.end(JSON.stringify({
        message:"Products NOt FOund",
        // data:product,
    }))
    }
    console.log(index)

    res.writeHead(201,{
        "content-type":"application/json"
         
    })
    res.end(JSON.stringify({
        message:"Products updated successfully",
        // data:product,
    }))
}

  
};
export default productController;

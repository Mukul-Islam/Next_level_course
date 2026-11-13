import path from "path";

const filePath = path.join(process.cwd(),"./src/database/db.json")

export const productService = ()=>{
    // console.log(process.cwd());
    console.log(filePath)
}
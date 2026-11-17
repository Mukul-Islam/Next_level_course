import fs from "fs";
import { readFileSync } from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from "url";
import type { Iproduct } from "../types/iProduct";


const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productService = () => {
  // console.log(filePath)
  const result = fs.readFileSync(filePath, "utf-8");
  // console.log(result.toString());
  // console.log(result)
  return JSON.parse(result);
  // return result
};
export const createProduct = (payLoad: Iproduct[]) => {
  fs.writeFileSync(filePath, JSON.stringify(payLoad));
};
// export default productService;


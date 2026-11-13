import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const product = [
    {
      id: 1,
      name: "product-1",
      price: 20,
    },
    {
      id: 2,
      name: "product-2",
      price: 30,
    },
  ];
productService();
  res.writeHead(200, {
    "content-type": "application/json",
  });
  res.end(JSON.stringify({ message: "This is products behen", data: product }));
};

export default productController;

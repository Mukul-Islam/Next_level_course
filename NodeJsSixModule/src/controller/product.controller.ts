
import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { Iproduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const pathname = url?.split("?")[0];
  const urlParams = pathname?.split("/");

  const id =
    urlParams &&
    urlParams[1] === "products" &&
    urlParams[2] &&
    Number.isFinite(Number(urlParams[2]))
      ? Number(urlParams[2])
      : null;

  // GET ALL PRODUCTS
  if (pathname === "/products" && method === "GET") {
    try {
      const products = productService();

      sendResponse(
        res,
        true,
        200,
        "Products retrieved successfully!",
        products,
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  }

  // GET SINGLE PRODUCT
  else if (method === "GET" && id !== null) {
    try {
      const products = productService();

      const product = products.find(
        (p: Iproduct) => p.id === id,
      );

      if (!product) {
        return sendResponse(
          res,
          false,
          404,
          "Product not found!",
        );
      }

      sendResponse(
        res,
        true,
        200,
        "Products retrieved successfully!",
        product,
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  }

  // POST PRODUCT
  else if (method === "POST" && pathname === "/products") {
    try {
      const body = await bodyParser(req);

      const newProduct = {
        id: Date.now(),
        ...body,
      };

      const products = productService();

      products.push(newProduct);

      createProduct(products);

      sendResponse(
        res,
        true,
        201,
        "Product created successfully!",
        newProduct,
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        return sendResponse(res, false, 400, "Invalid JSON body");
      }

      sendResponse(res, false, 500, "Internal server error");
    }
  }

  // PUT PRODUCT
  else if (method === "PUT" && id !== null) {
    try {
      const body = await bodyParser(req);

      const products = productService();

      const index = products.findIndex(
        (p: Iproduct) => p.id === id,
      );

      if (index < 0) {
        return sendResponse(
          res,
          false,
          404,
          "Product not found!",
        );
      }

      products[index] = {
        ...products[index],
        ...body,
        id: products[index].id,
      };

      createProduct(products);

      sendResponse(
        res,
        true,
        200,
        "Products updated successfully!",
        products[index],
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        return sendResponse(res, false, 400, "Invalid JSON body");
      }

      sendResponse(res, false, 500, "Internal server error");
    }
  }

  // DELETE PRODUCT
  else if (method === "DELETE" && id !== null) {
    try {
      const products = productService();

      const index = products.findIndex(
        (p: Iproduct) => p.id === id,
      );

      if (index < 0) {
        return sendResponse(
          res,
          false,
          404,
          "Product not found!",
        );
      }

      products.splice(index, 1);

      createProduct(products);

      sendResponse(
        res,
        true,
        200,
        "Deleted successfully!",
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  }

  // INVALID ROUTE
  else {
    sendResponse(res, false, 404, "Route not found!");
  }
};

export default productController;

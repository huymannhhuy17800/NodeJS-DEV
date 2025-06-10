import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = Router();
const baseUrl = "/products";

// Load products from fil

// GET all products
productRouter.get(baseUrl, getProducts);

// GET product by ID
productRouter.get(baseUrl + "/:id", getProduct);

// POST a new product
productRouter.post(baseUrl, createProduct);

// PUT update product by ID
// productRouter.put(baseUrl + "/:id", updateProduct);

// DELETE product by ID
productRouter.delete("/:id", deleteProduct);

export default productRouter;

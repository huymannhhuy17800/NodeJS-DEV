import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { sendResponse } from "../utils/sendResponse";

const productsFile = path.resolve("data/products.json");

// Load products from file
const loadProducts = (): any[] => {
  try {
    return JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  } catch {
    return [];
  }
};

// Save products to file
const saveProducts = (products: any) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf-8");
};

export const getProducts = (req: Request, res: Response) => {
  try {
    sendResponse(
      res.json(loadProducts()),
      "Get success",
      res.json(loadProducts()),
      200
    );
  } catch (error) {}
};

export const getProduct = (req: Request, res: Response) => {
  try {
    const product = loadProducts().find(
      (p: any) => p.id === parseInt(req.params.id)
    );
    product
      ? sendResponse(res.json(product), "Get success", res.json(product), 200)
      : sendResponse(
          res.json({ error: "Product not found" }),
          "Product not found",
          null,
          404
        );
  } catch (error) {}
};

export const createProduct = (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    saveProducts(products);
    sendResponse(
      res.json(newProduct),
      "Create success",
      res.json(newProduct),
      201
    );
  } catch (error) {}
};

export const updateProduct = (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    const index = products.findIndex(
      (p: any) => p.id === parseInt(req.params.id)
    );
    if (index === -1) {
      sendResponse(
        res.json({ error: "Product not found" }),
        "Product not found",
        null,
        404
      );
    }

    products[index] = { ...products[index], ...req.body };
    saveProducts(products);
    sendResponse(
      res.json(products[index]),
      "Update success",
      res.json(products[index]),
      200
    );
  } catch (error) {}
};

export const deleteProduct = (req: Request, res: Response) => {
  try {
    const products = loadProducts().filter(
      (p: any) => p.id !== parseInt(req.params.id)
    );
    saveProducts(products);
    sendResponse(res.json(products), "Delete success", products, 204);
  } catch (error) {}
};

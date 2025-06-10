import { Request, Response } from "express";
import fs from "fs";
import path from "path";

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
  res.json(loadProducts());
};

export const getProduct = (req: Request, res: Response) => {
  const product = loadProducts().find(
    (p: any) => p.id === parseInt(req.params.id)
  );
  product
    ? res.json(product)
    : res.status(404).json({ error: "Product not found" });
};

export const createProduct = (req: Request, res: Response) => {
  const products = loadProducts();
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const products = loadProducts();
  const index = products.findIndex(
    (p: any) => p.id === parseInt(req.params.id)
  );
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  saveProducts(products);
  res.json(products[index]);
};

export const deleteProduct = (req: Request, res: Response) => {
  const products = loadProducts().filter(
    (p: any) => p.id !== parseInt(req.params.id)
  );
  saveProducts(products);
  res.status(204).send();
};

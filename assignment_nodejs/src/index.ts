import express, { Request, Response } from "express";
import router from "./routes/user.route";
import path from "path";
import productRouter from "./routes/product.route";
import { apiKeyMiddleware } from "./middleware/product.auth";
import multer from "multer";
import bodyParser from "body-parser";
import uploadRouter from "./routes/upload.route";

// const express = require("express");
const app = express();
const port = 3000;

const baseUrl = "/api";

// const publicDir = path.resolve("src/page");
// const uploadsDir = path.resolve("src/uploads");
// // Configure multer for file uploads
// const upload = multer({ dest: uploadsDir });
// // Middleware for parsing application/json
// app.use(bodyParser.json());

// // Middleware for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (for form)
// app.use(express.static(publicDir));
app.use(express.json());

app.get("/homepage", (req, res) => {
  res.send("Hello World! from: " + req.url + " With method : " + req.method);
  console.log(req.url + req.method);
});

app.use(baseUrl, router);

app.use("", uploadRouter);

app.use(baseUrl, apiKeyMiddleware, productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

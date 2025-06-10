import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./controllers/user.controller";
import router from "./routes/user.route";
import path from "path";
import productRouter from "./routes/product.route";
import { apiKeyMiddleware } from "./middleware/product.auth";

// const express = require("express");
const app = express();
const port = 3000;

const baseUrl = "/api";

app.use(express.json());

app.get("/homepage", (req, res) => {
  res.send("Hello World! from: " + req.url + " With method : " + req.method);
  console.log(req.url + req.method);
});

app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      "D:NodeJSassignment_nodejspublicindex.html",
      "public",
      "index.html"
    )
  );
});

app.use(baseUrl, router);

app.use(baseUrl, apiKeyMiddleware, productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

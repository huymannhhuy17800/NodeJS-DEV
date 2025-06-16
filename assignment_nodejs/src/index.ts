import express, { Request, Response } from "express";
import router from "./routes/user.route";
import path from "path";
import productRouter from "./routes/product.route";
import { apiKeyMiddleware } from "./middleware/product.auth";
import uploadRouter from "./routes/upload.route";
import fs from "fs";
import https from "https";

// const express = require("express");
const app = express();
const port = 3000;

const httpsPort = 3001;

const baseUrl = "/api";

const options = {
  key: fs.readFileSync(path.resolve("cert/key.pem")),
  cert: fs.readFileSync(path.resolve("cert/cert.pem")),
};

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

//Create folder cert and run script to get 2 SSL certificate files 'key.pem' and 'cert.pem'
https
  .createServer(options, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to HTTPS Server</h1>");
  })
  .listen(httpsPort, () => {
    console.log(`Example app listening on port ${httpsPort}`);
  });

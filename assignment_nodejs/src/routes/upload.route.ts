import bodyParser from "body-parser";
import { Router } from "express";
import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const uploadRouter = express.Router();
const publicDir = path.resolve("src/page");
const uploadsDir = path.resolve("src/uploads");
// Configure multer for file uploads
const upload = multer({ dest: uploadsDir });
// Middleware for parsing application/json
uploadRouter.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
uploadRouter.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for form)
uploadRouter.use(express.static(publicDir));
uploadRouter.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(publicDir, "index.html"));
});

// Handle application/json
uploadRouter.post("/json", (req: Request, res: Response) => {
  res.json({
    message: "Received JSON data",
    body: req.body,
  });
});

// Handle application/x-www-form-urlencoded
uploadRouter.post("/urlencoded", (req: Request, res: Response) => {
  res.json({
    message: "Received URL-encoded data",
    body: req.body,
  });
});

// Handle multipart/form-data (file upload)
uploadRouter.post(
  "/multipart",
  upload.single("myfile"),
  (req: Request, res: Response) => {
    res.json({
      message: "Received multipart/form-data",
      fields: req.body,
      file: req.file,
    });
  }
);

export default uploadRouter;

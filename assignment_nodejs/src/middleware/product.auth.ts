import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY || "123456789";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    res
      .status(403)
      .json({ error: "Unauthorized access, setup api-key in header first" });
    return;
  }
  next();
};

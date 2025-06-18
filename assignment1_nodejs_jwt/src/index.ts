import express from "express";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";
import dotenv from "dotenv";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

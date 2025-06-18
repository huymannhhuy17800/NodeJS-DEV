import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { todoSchema } from "../validation/schemas";

const router = express.Router();

router.use(authenticate); // Apply auth middleware to all todo routes

router.post("/", validate(todoSchema), createTodo);
router.get("/", getTodos);
router.put("/:id", validate(todoSchema), updateTodo);
router.delete("/:id", deleteTodo);

export default router;

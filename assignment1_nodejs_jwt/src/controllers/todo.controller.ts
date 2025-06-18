import { Request, Response } from "express";
import { Todo } from "../models/todo";
import { sendResponse } from "../utils/sendResponse";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user._id,
    });
    await todo.save();

    sendResponse(res, "Create Todo Success", todo, 201);
  } catch (error) {
    sendResponse(res, "Server Error", null, 500);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    sendResponse(res, "Get Success", todos, 200);
  } catch (error) {
    sendResponse(res, "Server Error", null, 500);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return sendResponse(res, "Update failure, Todo not found", null, 404);
    }

    Object.assign(todo, req.body);
    await todo.save();

    sendResponse(res, "Update Success", todo, 200);
  } catch (error) {
    sendResponse(res, "Server Error", null, 500);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      sendResponse(res, "Todo not found", null, 404);
    }

    sendResponse(res, "Deleted Todo Success", todo, 200);
  } catch (error) {
    sendResponse(res, "Server Error", null, 500);
  }
};

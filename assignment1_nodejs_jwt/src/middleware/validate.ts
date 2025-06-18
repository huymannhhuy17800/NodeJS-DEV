import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { sendResponse } from "../utils/sendResponse";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return sendResponse(res, error.details[0].message, null, 400);
    }

    next();
  };
};

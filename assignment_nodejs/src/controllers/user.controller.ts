import { Request, Response } from "express";
import { listUsers } from "../dtos/user.dto";
import { sendResponse } from "../utils/sendResponse";
import { User } from "../types/user.type";
import path from "path";

export const getAllUsers = (req: Request, res: Response) => {
  try {
    sendResponse(res.json(listUsers), "List of Users", listUsers, 200);
  } catch (error) {
    sendResponse(res.json(null), "No User available", null, 404);
  }
};

export const getUser = (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const foundUser = listUsers.find((user) => id === user.id + "");
    if (foundUser) {
      sendResponse(res.json(foundUser), "User found", foundUser, 200);
    }
    sendResponse(res.json(null), "User not found", null, 404);
  } catch (error) {}
};

export const createUser = (req: Request, res: Response) => {
  try {
    const bodyId = req.body["id"];
    const existingUser = listUsers.find((user) => bodyId === user.id);

    if (!existingUser) {
      const newUser = {
        id: listUsers.length + 1,
        ...req.body,
      };
      listUsers.push(newUser);
      sendResponse(res.json(listUsers), "Add success", listUsers, 200);
    } else {
      sendResponse(
        res.send("User is already existed"),
        "Add Failed",
        null,
        400
      );
    }
  } catch (error) {}
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const bodyId = req.params["id"];
    const existingUser = listUsers.find((user) => bodyId === user.id + "");

    if (existingUser) {
      const newUser = {
        id: listUsers.length + 1,
        ...req.body,
      };
      listUsers.push(newUser);
      sendResponse(res.json(listUsers), "Update success", listUsers, 200);
    } else {
      sendResponse(
        res.send("User is not existed use post instead"),
        "Update Failed",
        null,
        400
      );
    }
  } catch (error) {}
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const bodyId = req.params["id"];
    const existingUser = listUsers.find((user) => bodyId === user.id + "");

    if (existingUser) {
      listUsers.splice(listUsers.indexOf(existingUser), 1);
      sendResponse(res.json(listUsers), "Delete success", listUsers, 200);
    } else {
      sendResponse(res.json("No user found"), "Delete failed", null, 404);
    }
  } catch (error) {}
};

// export const sendFile = (req: Request, res: Response) => {
//   res.sendFile(path.resolve(publicDir, "index.html"));
// };

export const submitUserData = () => {};

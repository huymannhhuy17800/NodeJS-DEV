import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { sendResponse } from "../utils/sendResponse";

// Helper function to generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "1d",
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, "Email already registered", null, 400);
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return success response with token and user data
    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    sendResponse(res, "Server error during registration", null, 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, "Invalid credentials", null, 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendResponse(res, "Invalid credentials", null, 401);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return success response with token and user data
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    sendResponse(res, "Server error during login", null, 500);
  }
};

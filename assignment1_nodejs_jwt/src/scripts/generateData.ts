import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { Todo } from "../models/todo";
import { User } from "../models/user";

dotenv.config();
// Sample data generation script
const generateData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/todo-app"
    );

    // Clear existing data
    await User.deleteMany({});
    await Todo.deleteMany({});

    // Create 10 users
    const users = await User.insertMany([
      {
        email: "user1@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:20:00Z",
        updatedAt: "2025-06-17T15:20:00Z",
      },
      {
        email: "user2@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:21:00Z",
        updatedAt: "2025-06-17T15:21:00Z",
      },
      {
        email: "user3@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:22:00Z",
        updatedAt: "2025-06-17T15:22:00Z",
      },
      {
        email: "user4@example.com",
        password: await bcrypt.hash("1", 10),
        createdAt: "2025-06-17T15:23:00Z",
        updatedAt: "2025-06-17T15:23:00Z",
      },
      {
        email: "user5@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:24:00Z",
        updatedAt: "2025-06-17T15:24:00Z",
      },
      {
        email: "user6@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:25:00Z",
        updatedAt: "2025-06-17T15:25:00Z",
      },
      {
        email: "user7@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:26:00Z",
        updatedAt: "2025-06-17T15:26:00Z",
      },
      {
        email: "user8@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:27:00Z",
        updatedAt: "2025-06-17T15:27:00Z",
      },
      {
        email: "user9@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:28:00Z",
        updatedAt: "2025-06-17T15:28:00Z",
      },
      {
        email: "user10@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
      {
        email: "user11@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
      {
        email: "user12@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
      {
        email: "user13@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
      {
        email: "user14@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
      {
        email: "user15@example.com",
        password: await bcrypt.hash("123", 10),
        createdAt: "2025-06-17T15:29:00Z",
        updatedAt: "2025-06-17T15:29:00Z",
      },
    ]);

    // Create todos for each user
    const todos = [];
    for (const user of users) {
      // Create 3-5 todos per user
      const numTodos = Math.floor(Math.random() * 3) + 3;

      for (let i = 0; i < numTodos; i++) {
        todos.push({
          content: `Todo ${i + 1} for ${user.email}`,
          completed: Math.random() > 0.5,
          user: user._id,
          createdAt: new Date(user.createdAt + i * 60000), // Add i minutes to user creation time
          updatedAt: new Date(user.createdAt + i * 60000),
        });
      }
    }

    await Todo.insertMany(todos);

    console.log("Sample data created successfully!");
    console.log(`Created ${users.length} users and ${todos.length} todos`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
};

// Run the script
generateData();

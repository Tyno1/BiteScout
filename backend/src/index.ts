import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import authMiddleware from "./middleware/authmiddleware.js";

import authRoutes from "../src/routes/auth.js";
import restaurantRoutes from "./routes/restaurant.js";
import userTypeRoutes from "./routes/userType.js";
import userRoutes from "./routes/user.js";
import restaurantAccessRoutes from "./routes/restaurantAccess.js";
import notificationRoutes from "./routes/notification.js";
import allergenRoutes from "./routes/alergen.js";
import foodCatalogueRoutes from "./routes/foodCatalogue.js";
import cuisineRoutes from "./routes/cuisine.js";
import courseRoutes from "./routes/course.js";

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow your client URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // User authentication and storing connection
  socket.on("authenticate", (userId) => {
    console.log(`User ${userId} authenticated with socket ${socket.id}`);
    connectedUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    // Remove user from connected users when they disconnect
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Connect to MongoDB
mongoose.connect(uri);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // This is key
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", authMiddleware, restaurantRoutes);
app.use("/api/user-types", userTypeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurant-access", restaurantAccessRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/food-catalogue", foodCatalogueRoutes);
app.use("/api/allergens", allergenRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/courses", courseRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

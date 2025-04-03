import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import { createServer } from "node:http";
import { Server } from "socket.io";

import restaurantRoutes from "./routes/restaurant.js";
import userTypeRoutes from "./routes/userType.js";
import userRoutes from "./routes/user.js";
import restaurantAccessRoutes from "./routes/restaurantAccess.js";
import notificationRoutes from "./routes/notification.js";
import allergenRoutes from "./routes/alergen.js";
import foodCatalogueRoutes from "./routes/foodCatalogue.js";
import cuisineRoutes from "./routes/cuisine.js";
import courseRoutes from "./routes/course.js";

import jwtCheck from "./middleware/auth.js";
import getUserInfoMiddleware from "./middleware/getUserInfoMiddleware.js";
import persistUserMiddleware from "./middleware/persistUserMiddleware.js";

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";
const expressSecret = process.env.EXPRESSS_SESSION_SECRET || "secret";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow your client URL
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
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(jwtCheck);

app.use(
  session({
    secret: expressSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(
  "/api/protected",
  getUserInfoMiddleware,
  persistUserMiddleware,
  (req: any, res) => {
    const { name, email, auth0Id, picture, userType, _id, restaurantCount } =
      req.dbUser;

    res.json({
      _id,
      name,
      email,
      auth0Id,
      picture,
      userType,
      restaurantCount,
    });
  }
);
app.use("/api/restaurants", restaurantRoutes);
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

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { requiredScopes } from "express-oauth2-jwt-bearer";
import session from "express-session";

import restaurantRoutes from "./routes/restaurant.js";
import userTypeRoutes from "./routes/userType.js";
import jwtCheck from "./middleware/auth.js";
import getUserInfoMiddleware from "./middleware/getUserInfoMiddleware.js";
import persistUserMiddleware from "./middleware/persistUserMiddleware.js";

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";
const expressSecret = process.env.EXPRESSS_SESSION_SECRET || "secret";
const app = express();

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
    const { name, email, sub, picture, userType, _id } = req.dbUser;
    console.log(name, email, sub, picture, userType, _id);

    res.json({
      _id,
      name,
      email,
      userId: sub,
      picture,
      userType,
    });
  }
);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/user-types", userTypeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

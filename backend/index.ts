import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING;
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

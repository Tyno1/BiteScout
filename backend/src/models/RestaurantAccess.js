import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const restaurantAccessSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  restaurantId: {
    type: String,
    required: true,
    ref: "RestaurantData",
  },
  role: {
    type: String,
    enum: ["guest", "user", "moderator", "admin", "root"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "suspended", "innactive"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RestaurantAccess ||
  model("RestaurantAccess", restaurantAccessSchema);

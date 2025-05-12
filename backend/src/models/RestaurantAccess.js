import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const restaurantAccessSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["manager", "staff"],
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
});

export default mongoose.models.RestaurantAccess ||
  model("RestaurantAccess", restaurantAccessSchema);

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
  // New fields for better access management
  approvedAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
  maxRestaurants: { type: Number, default: 1 },
  accessLevel: { type: String, enum: ['basic', 'premium', 'enterprise'], default: 'basic' },
  
  // Permission flags
  canEdit: { type: Boolean, default: false },
  canDelete: { type: Boolean, default: false },
  canViewAnalytics: { type: Boolean, default: false },
  canManageUsers: { type: Boolean, default: false },
  canManageContent: { type: Boolean, default: false },
});

export default mongoose.models.RestaurantAccess ||
  model("RestaurantAccess", restaurantAccessSchema);

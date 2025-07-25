import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for faster queries
    },
    type: {
      type: String,
      required: true,
      enum: ["access_request", "access_granted", "access_denied", "access_suspended", "restaurant_update", "system"],
    },
    title: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true }
);

// Add TTL index to automatically delete old notifications after 30 days
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

export default mongoose.models.Notifications ||
  model("Notification", NotificationSchema);

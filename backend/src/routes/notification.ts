import express from "express";
import * as controller from "../controllers/notificationController.js";

const router = express.Router();

// Apply authentication middleware to all notification routes

// Get recent notifications
router.get("/:userId", controller.getNotifications);

// Mark notification as read
router.patch("/:userId/:notificationId/read", controller.markNotificationAsRead);

// Mark all notifications as read
router.patch("/:userId/read-all", controller.markAllAsReadController);

export default router;

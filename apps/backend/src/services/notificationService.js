import Notification from "../models/Notification.js";

/**
 * Create a notification and deliver it via socket if user is online
 */
export const createAndSendNotification = async (
  io,
  connectedUsers,
  userId,
  notificationData
) => {
  try {
    // 1. Create notification in database
    const timestamp = new Date();
    const notification = await Notification.create({
      userId,
      isRead: false,
      type: notificationData.type,
      title: notificationData.title,
      message: notificationData.message,
      metadata: notificationData.metadata || {},
      createdAt: timestamp,
    });

    // 2. Send real-time notification if user is connected
    const socketId = connectedUsers.get(userId);
    if (socketId) {
      io.to(socketId).emit("notification", {
        ...notificationData,
        _id: notification._id.toString(),
        timestamp: timestamp,
      });
    }

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    // Don't throw - notification failures shouldn't break main functionality
  }
};

/**
 * Get recent notifications for a user
 */
export const getRecentNotifications = async (
  userId,
  limit = 20,
  offset = 0
) => {
  return Notification.find({ userId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
};

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
};

/**
 * Mark all notifications as read for a user
 */
export const markAllAsRead = async (userId) => {
  const result = await Notification.updateMany(
    { userId, isRead: false }, 
    { isRead: true }
  );
  return result.modifiedCount;
};

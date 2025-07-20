import mongoose from "mongoose";
import Notification from "../models/Notification.js";

/**
 * Migration script to update existing notifications to match new API spec
 * This script should be run once to migrate existing data
 */
const migrateNotifications = async () => {
  try {
    console.log("Starting notification migration...");
    
    // Get all existing notifications
    const notifications = await Notification.find({});
    console.log(`Found ${notifications.length} notifications to migrate`);
    
    let updatedCount = 0;
    
    for (const notification of notifications) {
      const updates = {};
      
      // Update field names if needed
      if (notification.read !== undefined && notification.isRead === undefined) {
        updates.isRead = notification.read;
        // Note: We don't remove the old field immediately to avoid breaking existing code
        // The old field will be cleaned up in a future migration
      }
      
      // Update type values if needed
      if (notification.type === "access-request") {
        updates.type = "access_request";
      }
      
      // Add missing fields if they don't exist
      if (!notification.message && notification.data) {
        // Try to extract message from data
        updates.message = typeof notification.data === 'string' 
          ? notification.data 
          : notification.data.message || "Notification";
      }
      
      if (!notification.title) {
        updates.title = "Notification";
      }
      
      if (!notification.metadata) {
        updates.metadata = {};
      }
      
      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        await Notification.findByIdAndUpdate(notification._id, updates);
        updatedCount++;
      }
    }
    
    console.log(`Successfully migrated ${updatedCount} notifications`);
    console.log("Migration completed successfully!");
    
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Connect to MongoDB (you'll need to set up the connection)
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bitescout";
  
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      return migrateNotifications();
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    });
}

export default migrateNotifications; 
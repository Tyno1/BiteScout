import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

// Update user's own profile (non-sensitive fields only)
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUser = req.user as { userId: string; userType: string };
    if (!currentUser) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.params.userId;
    const updateData = req.body;

    // Users can only update their own profile
    if (currentUser.userId !== userId) {
      return res.status(403).json({ 
        message: "You can only update your own profile" 
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Prevent updating sensitive fields
    const allowedFields = [
      "name", 
      "username", 
      "phone", 
      "bio", 
      "dietaryPreferences", 
      "location", 
      "imageUrl",
      "notificationSettings"
    ];

    const filteredUpdateData: Record<string, unknown> = {};
    
    // Only allow updates to allowed fields
    for (const key of Object.keys(updateData)) {
      if (allowedFields.includes(key)) {
        filteredUpdateData[key] = updateData[key];
      }
    }

    // If updating username, check for uniqueness
    if (filteredUpdateData.username && typeof filteredUpdateData.username === 'string' && filteredUpdateData.username.trim() !== "") {
      const existingUser = await User.findOne({ 
        username: filteredUpdateData.username,
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Username already taken" 
        });
      }
    }

    // If updating phone, check for uniqueness
    if (filteredUpdateData.phone !== undefined) {
      if (filteredUpdateData.phone && typeof filteredUpdateData.phone === 'string' && filteredUpdateData.phone.trim() !== "") {
        // Only check uniqueness for non-empty phone numbers
        const existingUser = await User.findOne({ 
          phone: filteredUpdateData.phone,
          _id: { $ne: userId }
        });
        
        if (existingUser) {
          return res.status(400).json({ 
            message: "Phone number already registered" 
          });
        }
      }
      // Allow empty strings - no conversion to null needed
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      filteredUpdateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error: unknown) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ 
      message: "Error updating profile", 
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Get user's own profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("currentUser", req.user);

    const currentUser = req.user as { userId: string; userType: string };
    if (!currentUser) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.params.userId;

    // Users can only view their own profile
    if (currentUser.userId !== userId) {
      return res.status(403).json({ 
        message: "You can only view your own profile" 
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error: unknown) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ 
      message: "Error retrieving profile", 
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Change user's own password
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUser = req.user as { userId: string; userType: string };
    if (!currentUser) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    // Users can only change their own password
    if (currentUser.userId !== userId) {
      return res.status(403).json({ 
        message: "You can only change your own password" 
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: "Current password and new password are required" 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: "New password must be at least 6 characters long" 
      });
    }

    // Get user with password for comparison
    const user = await User.findById(userId).select("+password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ 
        message: "Current password is incorrect" 
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error: unknown) {
    console.error("Error changing password:", error);
    res.status(500).json({ 
      message: "Error changing password", 
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

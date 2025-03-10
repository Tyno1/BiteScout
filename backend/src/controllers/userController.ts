import { Request, Response, NextFunction } from "express";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";

export const UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.userId;
    

    // Add restaurant Count
    const restaurant = await RestaurantData.find({
      ownerId: _id,
    });

    const updatedData = { restaurantCount: restaurant.length };
    
    const user = await User.findByIdAndUpdate(
      _id,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

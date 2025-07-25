import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";

export const UpdateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const _id = req.params.userId;

		    // Add restaurant Count and change userType to Admin
    const restaurant = await RestaurantData.find({
      ownerId: new mongoose.Types.ObjectId(_id),
    });

		// if restaurant count is 0 or restaurant is not found
		if (!restaurant || restaurant.length === 0) {
			return res
				.status(404)
				.json({ message: "User is not a Restaurant Owner" });
		}

		// Assign admin status to the user
		const updatedData = {
			restaurantCount: restaurant.length,
			userType: "admin" as const,
		};

		// Update the user's restaurant count and userType to Admin
		const user = await User.findByIdAndUpdate(
			_id,
			updatedData,
			{ new: true }, // Return the updated document
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json({
			message: "User promoted to Admin successfully",
			user,
		});
	} catch (error: any) {
		console.error("Error updating user:", error);
		res
			.status(500)
			.json({ message: "Error updating user", error: error.message });
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.params.userId;

		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Delete the user
		await User.findByIdAndDelete(userId);

		res.status(200).json({
			message: "User deleted successfully",
			user,
		});
	} catch (error: any) {
		console.error("Error deleting user:", error);
		res
			.status(500)
			.json({ message: "Error deleting user", error: error.message });
	}
};

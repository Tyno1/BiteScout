import type { NextFunction, Request, Response } from "express";


import mongoose from "mongoose";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import RestaurantAccess from "../models/RestaurantAccess.js";
import User from "../models/User.js";

import type { ApiError } from "shared/types/common/errors";

import type {
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByIdResponse,
  GetUserStatsResponse,
  UpdateUserResponse,
} from "shared/types/user-management";

// Type definitions for API responses with error handling
type GetAllUsersApiResponse = GetAllUsersResponse | ApiError;
type GetUserByIdApiResponse = GetUserByIdResponse | ApiError;
type UpdateUserApiResponse = UpdateUserResponse | ApiError;
type DeleteUserApiResponse = DeleteUserResponse | ApiError;
type GetUserStatsApiResponse = GetUserStatsResponse | ApiError;

// Helper function to check if user has admin privileges
const hasAdminPrivileges = (userType: string): boolean => {
	return ["admin", "moderator", "root"].includes(userType);
};

// Helper function to check if user can modify target user
const canModifyUser = (
	currentUserType: string,
	targetUserType: string,
): boolean => {
	// Root can modify anyone
	if (currentUserType === "root") return true;

	// Admin can modify users, guests, and moderators (but not other admins or root)
	if (currentUserType === "admin") {
		return ["user", "guest", "moderator"].includes(targetUserType);
	}

	// Moderator can only modify users and guests
	if (currentUserType === "moderator") {
		return ["user", "guest"].includes(targetUserType);
	}

	return false;
};

// Get all users (with pagination and filtering)
export const getAllUsers = async (
	req: Request,
	res: Response<GetAllUsersApiResponse>,
	next: NextFunction,
) => {
	try {
		// Check if current user has admin privileges
		const currentUser = req.user;
		if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
		}

		const page = Number.parseInt(req.query.page?.toString() || "1") || 1;
		const limit = Number.parseInt(req.query.limit?.toString() || "10") || 10;
		const search = req.query.search?.toString();
		const userType = req.query.userType?.toString();
		const status = req.query.status?.toString();

		// Build filter object
		const filter: Record<string, unknown> = {};

		if (search) {
			filter.$or = [
				{ name: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
				{ username: { $regex: search, $options: "i" } },
			];
		}

		if (userType) {
			filter.userType = userType;
		}

		// Calculate skip value for pagination
		const skip = (page - 1) * limit;

		// Get users with pagination
		const users = await User.find(filter)
			.select("-password")
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		// Get total count for pagination
		const totalUsers = await User.countDocuments(filter);

		// Get restaurant access information for each user
		const usersWithAccess = await Promise.all(
			users.map(async (user) => {
				const restaurantAccess = await RestaurantAccess.find({
					userId: user._id,
				});
				return {
					...user.toObject(),
					restaurantAccess: restaurantAccess.length,
					activeRestaurants: restaurantAccess.filter(
						(ra) => ra.status === "approved",
					).length,
				};
			}),
		);

		res.status(200).json({
			users: usersWithAccess,
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalUsers / limit),
				totalUsers,
				hasNextPage: page * limit < totalUsers,
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		return next(error);
	}
};

// Get user by ID
export const getUserById = async (
	req: Request,
	res: Response<GetUserByIdApiResponse>,
	next: NextFunction,
) => {
	try {
		// Check if current user has admin privileges
		const currentUser = req.user;
		if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
		}

		const userId = req.params.userId;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"));
		}

		const user = await User.findById(userId).select("-password");

		if (!user) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Get restaurant access information
		const restaurantAccess = await RestaurantAccess.find({ userId: user._id });

		const userWithAccess = {
			...user.toObject(),
			restaurantAccess: restaurantAccess.length,
			activeRestaurants: restaurantAccess.filter(
				(ra) => ra.status === "approved",
			).length,
			restaurantAccessDetails: restaurantAccess,
		};

		res.status(200).json({ user: userWithAccess });
	} catch (error) {
		return next(error);
	}
};

// Update user (admin operation)
export const updateUser = async (
	req: Request,
	res: Response<UpdateUserApiResponse>,
	next: NextFunction,
) => {
	try {
		// Check if current user has admin privileges
		const currentUser = req.user;
		if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
		}

		const userId = req.params.userId;
		const updateData = req.body;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"));
		}

		// Get target user to check their current userType
		const targetUser = await User.findById(userId);
		if (!targetUser) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Check if current user can modify target user
		if (!canModifyUser(currentUser.userType, targetUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. You cannot modify this user."));
		}

		// Prevent updating sensitive fields unless root
		if (currentUser.userType !== "root") {
			const { userType, ...safeUpdateData } = updateData;
			// Create a clean update object without sensitive fields
			const cleanUpdateData = { ...safeUpdateData };
			Object.assign(updateData, cleanUpdateData);
		}

		// If updating userType, validate the new type
		if (updateData.userType && currentUser.userType === "root") {
			if (
				!["guest", "user", "admin", "moderator", "root"].includes(
					updateData.userType,
				)
			) {
				return next(createError(ErrorCodes.BAD_REQUEST, "Invalid user type"));
			}
		}

		// Update the user
		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
			runValidators: true,
		}).select("-password");

		if (!updatedUser) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		res.status(200).json({
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		return next(error);
	}
};

// Delete user
export const deleteUser = async (
	req: Request,
	res: Response<DeleteUserApiResponse>,
	next: NextFunction,
) => {
	try {
		// Check if current user has admin privileges
		const currentUser = req.user;
		if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
		}

		const userId = req.params.userId;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"));
		}

		// Prevent self-deletion
		if (currentUser.userId === userId) {
			return next(createError(ErrorCodes.BAD_REQUEST, "You cannot delete your own account"));
		}

		// Get target user to check their current userType
		const targetUser = await User.findById(userId);
		if (!targetUser) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Check if current user can delete target user
		if (!canModifyUser(currentUser.userType, targetUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. You cannot delete this user."));
		}

		// Delete restaurant access records first
		await RestaurantAccess.deleteMany({ userId: userId });

		// Delete the user
		await User.findByIdAndDelete(userId);

		res.status(200).json({
			message: "User deleted successfully",
			deletedUser: {
				_id: targetUser._id,
				name: targetUser.name,
				email: targetUser.email,
			},
		});
	} catch (error) {
		return next(error);
	}
};

// Note: User suspension is handled at the restaurant access level
// Use RestaurantAccess controller's SuspendAccess function instead

// Get user statistics
export const getUserStats = async (
	req: Request,
	res: Response<GetUserStatsApiResponse>,
	next: NextFunction,
) => {
	try {
		// Check if current user has admin privileges
		const currentUser = req.user;
		if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
			return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
		}

		// Get user counts by type
		const userTypeStats = await User.aggregate([
			{
				$group: {
					_id: "$userType",
					count: { $sum: 1 },
				},
			},
		]);

		// Get total users
		const totalUsers = await User.countDocuments();

		// Get users created in last 30 days
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
		const newUsersThisMonth = await User.countDocuments({
			createdAt: { $gte: thirtyDaysAgo },
		});

		// Get restaurant access statistics
		const accessStats = await RestaurantAccess.aggregate([
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
				},
			},
		]);

		res.status(200).json({
			totalUsers,
			newUsersThisMonth,
			userTypeBreakdown: userTypeStats,
			accessStatusBreakdown: accessStats,
		});
	} catch (error) {
		return next(error);
	}
};

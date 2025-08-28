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
import RestaurantData from "../models/RestaurantData.js";

// Helper function to get user permissions based on userType and context
const getUserPermissions = (userType: string, isOwner: boolean) => {
	// Platform-wide permissions (from userType)
	const platformPermissions = {
		canAccessAdminPanel: ["admin", "moderator", "root"].includes(userType),
		canCreateRestaurants: ["admin", "root"].includes(userType),
		canManageAllUsers: ["admin", "root"].includes(userType),
		canViewPlatformAnalytics: ["admin", "root"].includes(userType),
	};

	// Restaurant-specific permissions (from userType + context)
	const restaurantPermissions = {
		canEditRestaurant: isOwner || ["admin", "moderator"].includes(userType),
		canManageUsers: isOwner || ["admin"].includes(userType),
		canViewAnalytics: isOwner || ["admin", "moderator"].includes(userType),
		canEditMenu: isOwner || ["admin", "moderator"].includes(userType),
		canDeleteContent: isOwner || ["admin"].includes(userType),
		canManageContent: isOwner || ["admin", "moderator"].includes(userType),
	};

	return { ...platformPermissions, ...restaurantPermissions };
};

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
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. Admin privileges required.",
				),
			);
		}

		// Require restaurantId parameter for security
		const restaurantId = req.query.restaurantId?.toString();
		if (!restaurantId) {
			return next(
				createError(
					ErrorCodes.BAD_REQUEST,
					"Restaurant ID is required for security",
				),
			);
		}

		// Validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Invalid restaurant ID format"),
			);
		}

		// Check if current user has access to this restaurant
		const userRestaurantAccess = await RestaurantAccess.findOne({
			userId: currentUser.userId,
			restaurantId: restaurantId,
			status: "approved",
		});
		const restaurant = await RestaurantData.findById(restaurantId);

		if (!restaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		const isOwner = req.user?.userId === restaurant.ownerId?.toString();

		if (!userRestaurantAccess && !isOwner) {
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. You don't have access to this restaurant.",
				),
			);
		}

		const page = Number.parseInt(req.query.page?.toString() || "1") || 1;
		const limit = Number.parseInt(req.query.limit?.toString() || "10") || 10;
		const search = req.query.search?.toString();
		const userType = req.query.userType?.toString();
		const status = req.query.status?.toString();

		// Get users with access to this specific restaurant
		const restaurantAccessQuery: Record<string, unknown> = { restaurantId };

		if (status) {
			restaurantAccessQuery.status = status;
		}

		// Get restaurant access records with user details
		const restaurantAccessRecords = await RestaurantAccess.find(
			restaurantAccessQuery,
		)
			.populate({
				path: "userId",
				select: "-password",
				match: search
					? {
							$or: [
								{ name: { $regex: search, $options: "i" } },
								{ userType: userType ? userType : { $exists: true } },
							],
						}
					: {},
			})
			.sort({ createdAt: -1 });

		// Filter out records where user population failed (due to search filter)
		const validRecords = restaurantAccessRecords.filter(
			(record) => record.userId,
		);

		// If owner is requesting, also include owner information
		const allUsers = [...validRecords];
		if (isOwner) {
			// Get owner user details
			const ownerUser = await User.findById(restaurant.ownerId).select(
				"-password",
			);
			if (ownerUser) {
				// Add owner as first user with admin role (restaurant-level admin)
				allUsers.unshift({
					userId: ownerUser,
					role: "admin",
					status: "approved",
					_id: "owner-special-id",
					createdAt: restaurant.createdAt,
					updatedAt: restaurant.updatedAt,
				});
			}
		}

		// Apply pagination
		const totalUsers = allUsers.length;
		const skip = (page - 1) * limit;
		const paginatedRecords = allUsers.slice(skip, skip + limit);

		// Transform data to match expected response format
		const usersWithAccess = paginatedRecords.map((record) => {
			const userData = {
				...record.userId.toObject(),
				role: record.role,
				status: record.status,
				accessId: record._id === "owner-special-id" ? "owner" : record._id,
				restaurantAccess: 1, // User has access to this restaurant
				activeRestaurants: record.status === "approved" ? 1 : 0,
			};
			

			
			return userData;
		});



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
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. Admin privileges required.",
				),
			);
		}

		const userId = req.params.userId;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"),
			);
		}

		const user = await User.findById(userId).select("-password");

		if (!user) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Get restaurant access information for the current restaurant
		const restaurantId = req.query.restaurantId?.toString();
		if (!restaurantId) {
			return next(
				createError(
					ErrorCodes.BAD_REQUEST,
					"Restaurant ID is required for security",
				),
			);
		}

		// Validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Invalid restaurant ID format"),
			);
		}

		// Get specific restaurant access for this user
		const restaurantAccess = await RestaurantAccess.findOne({
			userId: user._id.toString(),
			restaurantId: restaurantId,
		});

		// Check if current user has access to this restaurant
		const currentUserRestaurantAccess = await RestaurantAccess.findOne({
			userId: currentUser.userId,
			restaurantId: restaurantId,
			status: "approved",
		});

		const restaurant = await RestaurantData.findById(restaurantId);
		if (!restaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		const isOwner = currentUser.userId === restaurant.ownerId?.toString();
		
		if (!currentUserRestaurantAccess && !isOwner) {
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. You don't have access to this restaurant.",
				),
			);
		}

		// If user is the owner, add owner-specific data
		let status = "approved";
		let accessId = "owner";

		if (restaurantAccess) {
			status = restaurantAccess.status;
			accessId = restaurantAccess._id.toString();
			
			// Set approval date when status changes to approved
			if (restaurantAccess.status === 'approved' && !restaurantAccess.approvedAt) {
				restaurantAccess.approvedAt = new Date();
				await restaurantAccess.save();
			}
		} else if (user._id.toString() === restaurant.ownerId?.toString()) {
			// User is the restaurant owner
			status = "approved";
			accessId = "owner";
		}

		// Calculate permissions based on userType and context
		const targetIsOwner = user._id.toString() === restaurant.ownerId?.toString();
		const permissions = getUserPermissions(user.userType, targetIsOwner);

		const userWithAccess = {
			...user.toObject(),
			status,
			accessId,
			restaurantAccess: restaurantAccess ? 1 : 0,
			activeRestaurants: restaurantAccess && restaurantAccess.status === "approved" ? 1 : 0,
			restaurantAccessDetails: restaurantAccess ? [restaurantAccess] : [],
			// Map new fields for frontend
			lastLoginAt: user.lastLogin,
			approvedAt: restaurantAccess?.approvedAt,
			accessExpiresAt: restaurantAccess?.expiresAt,
			maxRestaurants: restaurantAccess?.maxRestaurants || 1,
			accessLevel: restaurantAccess?.accessLevel || 'basic',
			// Use unified permissions instead of separate role
			permissions,
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
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. Admin privileges required.",
				),
			);
		}

		const userId = req.params.userId;
		const updateData = req.body;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"),
			);
		}

		// Get target user to check their current userType
		const targetUser = await User.findById(userId);
		if (!targetUser) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Check if current user can modify target user
		if (!canModifyUser(currentUser.userType, targetUser.userType)) {
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. You cannot modify this user.",
				),
			);
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
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. Admin privileges required.",
				),
			);
		}

		const userId = req.params.userId;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Invalid user ID format"),
			);
		}

		// Prevent self-deletion
		if (currentUser.userId === userId) {
			return next(
				createError(
					ErrorCodes.BAD_REQUEST,
					"You cannot delete your own account",
				),
			);
		}

		// Get target user to check their current userType
		const targetUser = await User.findById(userId);
		if (!targetUser) {
			return next(createError(ErrorCodes.NOT_FOUND, "User not found"));
		}

		// Check if current user can delete target user
		if (!canModifyUser(currentUser.userType, targetUser.userType)) {
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. You cannot delete this user.",
				),
			);
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
			return next(
				createError(
					ErrorCodes.FORBIDDEN,
					"Access denied. Admin privileges required.",
				),
			);
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

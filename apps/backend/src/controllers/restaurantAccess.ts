import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import type {
  DeleteRestaurantAccessRequest,
  DeleteRestaurantAccessResponse,
  GetRestaurantAccessByOwnerRequest,
  GetRestaurantAccessByOwnerResponse,
  GetRestaurantAccessByUserRequest,
  GetRestaurantAccessByUserResponse,
  GrantRestaurantAccessRequest,
  GrantRestaurantAccessResponse,
  RequestRestaurantAccessRequest,
  RequestRestaurantAccessResponse,
  SuspendRestaurantAccessRequest,
  SuspendRestaurantAccessResponse,
  UpdateRestaurantAccessRequest,
  UpdateRestaurantAccessResponse,
} from "shared/types/access";
import type { AccessRoles } from "shared/types/api/schemas";
import { AccessRoleEnumValues, AccessStatusEnum } from "shared/types/api/schemas";
import type {
  RestaurantAccess as RestaurantAccessType,
} from "shared/types/api/schemas";
import type { ApiError } from "shared/types/common/errors";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import RestaurantAccess from "../models/RestaurantAccess.js";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";
import { createAndSendNotification } from "../services/notificationService.js";





// Combined response types for each endpoint
type RequestRestaurantAccessApiResponse =
  | RequestRestaurantAccessResponse
  | ApiError;
type GetRestaurantAccessByUserApiResponse =
  | GetRestaurantAccessByUserResponse
  | ApiError;
type GetRestaurantAccessByOwnerApiResponse =
  | GetRestaurantAccessByOwnerResponse
  | ApiError;
type GrantRestaurantAccessApiResponse =
  | GrantRestaurantAccessResponse
  | ApiError;
type SuspendRestaurantAccessApiResponse =
  | SuspendRestaurantAccessResponse
  | ApiError;
type DeleteRestaurantAccessApiResponse =
  | DeleteRestaurantAccessResponse
  | ApiError;
type UpdateRestaurantAccessApiResponse =
  | UpdateRestaurantAccessResponse
  | ApiError;

/**
 * Notifies the owner of a restaurant about a new access request.
 */
const notifyRestaurantOwner = async (
  req: Request,
  restaurantId: string,
  userId: string,
  newRestaurantAccess: RestaurantAccessType
) => {
  const restaurant = await RestaurantData.findById(restaurantId);
  if (!restaurant) {
    return { error: "Restaurant not found", status: 404 };
  }

  if (restaurant?.ownerId) {
    const io = req.app.get("io");
    const connectedUsers = req.app.get("connectedUsers");
    const ownerSocketId = connectedUsers.get(restaurant.ownerId.toString());

    if (ownerSocketId) {
      const requester = await User.findById(userId);
      await createAndSendNotification(
        io,
        connectedUsers,
        restaurant.ownerId.toString(),
        {
          type: "access-request",
          data: {
            accessId: newRestaurantAccess._id,
            restaurantId: restaurant._id,
            restaurantName: restaurant.name,
            requesterName: requester?.name || "Unknown user",
            requesterEmail: requester?.email || "",
            requestTime: newRestaurantAccess.createdAt,
          },
        }
      );
    }
  }

  return null;
};

/**
 * Updates the user type of a user.
 */
const updateUserUsertype = async (
  usertype: AccessRoles,
  userId: string,
  res: Response
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { userType: usertype?.toLowerCase() },
    { new: true }
  );

  if (!user) {
    return {
      error: "User not found during access request process",
      status: 404,
    };
  }
  return { user };
};

/**
 * Handles the authorization request for a user to access a restaurant.
 * Checks if the user ID and restaurant ID are provided, validates them,
 * checks if the user already has access, creates a new access request,
 * and sends a notification to the restaurant owner if the request is successful.
 */
export const RequestAuthorization = async (
  req: Request<
    { restaurantId: string },
    unknown,
    RequestRestaurantAccessRequest
  >,
  res: Response<RequestRestaurantAccessApiResponse>,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const { userId } = req.body;

    if (!userId || !restaurantId) {
      return next(
        createError(
          ErrorCodes.BAD_REQUEST,
          "User ID and Restaurant ID are required"
        )
      );
    }

    const existingUser = await RestaurantAccess.findOne({
      userId,
      restaurantId,
    });
    if (existingUser) {
      return next(
        createError(
          ErrorCodes.CONFLICT,
          "User already has access to this restaurant"
        )
      );
    }

    const newRestaurantAccess = await RestaurantAccess.create({
      restaurantId,
      userId,
      status: AccessStatusEnum.Pending,
    });

    if (!newRestaurantAccess) {
      return next(
        createError(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          "Failed to create user access request"
        )
      );
    }

    const notificationError = await notifyRestaurantOwner(
      req,
      restaurantId,
      userId,
      newRestaurantAccess
    );
    if (notificationError) {
      return next(
        createError(notificationError.status, notificationError.error)
      );
    }

    res.status(201).json({
      message: "Authorization request sent successfully",
      restaurantAccess: newRestaurantAccess,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Retrieves all restaurant access records for a specific user.
 */
export const GetRestaurantAccessByUserId = async (
  req: Request<GetRestaurantAccessByUserRequest>,
  res: Response<GetRestaurantAccessByUserApiResponse>,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "User ID is required"));
    }

    const restaurantAccesses = await RestaurantAccess.find({ userId: userId });

    // Return empty array instead of 404 error when no access records found
    // This allows frontend to handle empty states gracefully
    res.status(200).json({ restaurantAccesses: restaurantAccesses || [] });
  } catch (error) {
    return next(error);
  }
};

/**
 * Retrieves all restaurant access records for a specific owner.
 */
export const GetRestaurantAccessByOwnerId = async (
  req: Request<GetRestaurantAccessByOwnerRequest>,
  res: Response<GetRestaurantAccessByOwnerApiResponse>,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params;

    if (!ownerId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Owner ID is required"));
    }

    const restaurant = await RestaurantData.findOne({ ownerId: new mongoose.Types.ObjectId(ownerId) });

    if (!restaurant) {
      return next(
        createError(ErrorCodes.NOT_FOUND, "No restaurant found for this owner")
      );
    }

    const restaurantAccesses = await RestaurantAccess.find({
      restaurantId: restaurant._id,
    })
      .populate("userId")
      .populate("restaurantId");

    // Return empty array instead of 404 error when no access records found
    // This allows frontend to handle empty states gracefully
    res.status(200).json({ restaurantAccesses: restaurantAccesses || [] });
  } catch (error) {
    return next(error);
  }
};

/**
 * Grants access to a user for a specific restaurant
 * and updates the user's type to "moderator" upon granting access.
 */
export const GrantAccess = async (
  req: Request<GrantRestaurantAccessRequest>,
  res: Response<GrantRestaurantAccessApiResponse>,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Access ID is required"));
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatusEnum.Approved },
      { new: true }
    );

    if (!accessRecord) {
      return next(createError(ErrorCodes.NOT_FOUND, "Access record not found"));
    }

    try {
      const updatedUser = await updateUserUsertype(
        AccessRoleEnumValues.Moderator,
        accessRecord.userId.toString(),
        res
      );

      if (updatedUser?.error) {
        return next(createError(updatedUser.status, updatedUser.error));
      }
    } catch (error) {
      return next(
        createError(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          "An error occurred while updating the user type"
        )
      );
    }

    res.status(200).json({
      message: "Access granted successfully",
      accessRecord,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Updates the role of a user in a specific restaurant.
 */
export const UpdateRole = async (
  req: Request<{ accessId: string }, unknown, UpdateRestaurantAccessRequest>,
  res: Response<UpdateRestaurantAccessApiResponse>,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;
    const { status } = req.body;

    if (!accessId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Access ID is required"));
    }

    if (!status) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Status is required"));
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status },
      { new: true }
    );

    if (!accessRecord) {
      return next(createError(ErrorCodes.NOT_FOUND, "Access record not found"));
    }

    res.status(200).json({
      message: "Status updated successfully",
      accessRecord,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Suspends a user's access to a specific restaurant.
 */
export const SuspendAccess = async (
  req: Request<SuspendRestaurantAccessRequest>,
  res: Response<SuspendRestaurantAccessApiResponse>,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Access ID is required"));
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatusEnum.Suspended },
      { new: true }
    );

    if (!accessRecord) {
      return next(createError(ErrorCodes.NOT_FOUND, "Access record not found"));
    }

    res.status(200).json({
      message: "Access Suspended Successfully",
      accessRecord,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Deletes a user's access to a specific restaurant
 * and updates the user's type to "guest" upon deletion.
 */
export const DeleteAccess = async (
  req: Request<DeleteRestaurantAccessRequest>,
  res: Response<DeleteRestaurantAccessApiResponse>,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Access ID is required"));
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatusEnum.Innactive },
      { new: true }
    );

    if (!accessRecord) {
      return next(createError(ErrorCodes.NOT_FOUND, "Access record not found"));
    }

    try {
      const updatedUser = await updateUserUsertype(
        AccessRoleEnumValues.Guest,
        accessRecord.userId.toString(),
        res
      );

      if (updatedUser?.error) {
        return next(createError(updatedUser.status, updatedUser.error));
      }
    } catch (error) {
      return next(
        createError(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          "An error occurred while updating the user type"
        )
      );
    }

    res.status(200).json({
      message: "Access deleted successfully",
      accessRecord,
    });
  } catch (error) {
    return next(error);
  }
};

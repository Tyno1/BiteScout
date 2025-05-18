import { NextFunction, Request, Response } from "express";
import RestaurantAccess from "../models/RestaurantAccess.js";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";
import { createAndSendNotification } from "../services/notificationService.js";
import UserTypeModel from "../models/UserType.js";

export enum UserType {
  Guest = "guest",
  User = "user",
  Moderator = "moderator",
  Admin = "admin",
  Root = "root",
}

export enum AccessStatus {
  Pending = "pending",
  Approved = "approved",
  Suspended = "suspended",
  Innactive = "innactive",
}

const validateRequest = (
  userId: string,
  restaurantId: string,
  res: Response
): boolean => {
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return false;
  }
  if (!restaurantId) {
    res.status(400).json({ error: "Restaurant ID is required" });
    return false;
  }
  return true;
};

const checkExistingAccess = async (
  userId: string,
  restaurantId: string,
  res: Response
): Promise<boolean> => {
  const existingUser = await RestaurantAccess.findOne({ userId, restaurantId });
  if (existingUser) {
    res
      .status(403)
      .json({ error: "User already has access to this restaurant" });
    return true;
  }
  return false;
};

const createAccessRequest = async (
  userId: string,
  restaurantId: string,
  res: Response
) => {
  const newRestaurantAccess = await RestaurantAccess.create({
    restaurantId,
    userId,
    role: "staff",
    status: "pending",
  });

  if (!newRestaurantAccess) {
    res.status(500).json({ error: "Failed to create user access request" });
    return null;
  }

  return newRestaurantAccess;
};

/**
 * Notifies the owner of a restaurant about a new access request.
 *
 * @param req - The HTTP request object, which contains application-level properties such as `io` (Socket.IO instance) and `connectedUsers` (a map of connected user IDs to their socket IDs).
 * @param restaurantId - The ID of the restaurant for which access is being requested.
 * @param userId - The ID of the user requesting access to the restaurant.
 * @param newRestaurantAccess - The new access request object containing details about the request.
 * @returns An object with an error message and status code if the restaurant is not found, or `null` if the notification is successfully sent or no notification is required.
 */
const notifyRestaurantOwner = async (
  req: Request,
  restaurantId: string,
  userId: string,
  newRestaurantAccess: any
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
 * @param usertype - The new user type to assign.
 * @param userId - The ID of the user to update.
 * @param res - The response object for sending error responses.
 * @returns The updated user object if successful, or an error object if the user type or user is not found.
 */
const updateUserUsertype = async (
  usertype: UserType,
  userId: string,
  res: Response
) => {
  const userTypeRecord = await UserTypeModel.findOne({
    name: usertype.toLowerCase(),
  });

  if (!userTypeRecord) {
    return {
      error: "User type not found during access request process",
      status: 404,
    };
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { userType: userTypeRecord._id },
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

// This function handles the authorization request for a user to access a restaurant
// It checks if the user ID and restaurant ID are provided, validates them,
// checks if the user already has access, creates a new access request,
// and sends a notification to the restaurant owner if the request is successful
export const RequestAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const { userId } = req.body;

    if (!validateRequest(userId, restaurantId, res)) return;

    if (await checkExistingAccess(userId, restaurantId, res)) return;

    const newRestaurantAccess = await createAccessRequest(
      userId,
      restaurantId,
      res
    );
    if (!newRestaurantAccess) return;

    const notificationError = await notifyRestaurantOwner(
      req,
      restaurantId,
      userId,
      newRestaurantAccess
    );
    if (notificationError) {
      res
        .status(notificationError.status)
        .json({ error: notificationError.error });
      return;
    }

    res.status(200).json({
      message: "Authorization request sent successfully",
      restaurantAccess: newRestaurantAccess,
    });
  } catch (error) {
    next(error);
  }
};
// This function retrieves all restaurant access records for a specific user who isnt the owner

export const GetRestaurantAccessByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const restaurantAccesses = await RestaurantAccess.find({ userId: userId });

    if (!restaurantAccesses || restaurantAccesses.length === 0) {
      res
        .status(404)
        .json({ error: "No restaurant access found for this user" });
      return;
    }

    res.status(200).json({ restaurantAccesses });
  } catch (error) {
    next(error);
  }
};
// This function retrieves all restaurant access records for a specific owner
export const GetRestaurantAccessByOwnerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params;

    if (!ownerId) {
      res.status(400).json({ error: "Owner ID is required" });
      return;
    }

    const restaurant = await RestaurantData.findOne({ ownerId });

    if (!restaurant) {
      res.status(404).json({ error: "No restaurant found for this owner" });
      return;
    }

    const restaurantAccesses = await RestaurantAccess.find({
      restaurantId: restaurant._id,
    })
      .populate("userId")
      .populate("restaurantId");

    if (!restaurantAccesses || restaurantAccesses.length === 0) {
      res
        .status(404)
        .json({ error: "No restaurant access found for this owner" });
      return;
    }

    res.status(200).json({ restaurantAccesses });
  } catch (error) {
    next(error);
  }
};

// This function grants access to a user for a specific restaurant
// and updates the user's type to "user" upon granting access
export const GrantAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      res.status(400).json({ error: "Access Id is required" });
      return;
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatus.Approved },
      { new: true }
    );

    if (!accessRecord) {
      res.status(404).json({ error: "Access record not found" });
      return;
    }
    try {
      const updatedUser = await updateUserUsertype(
        UserType.User,
        accessRecord.userId.toString(),
        res
      );

      if (updatedUser?.error) {
        res.status(updatedUser.status).json({ error: updatedUser.error });
        return;
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the user type" });
      return;
    }

    res
      .status(200)
      .json({ message: "Access granted successfully", accessRecord });
  } catch (error) {
    next(error);
  }
};

// This function updates the role of a user in a specific restaurant
export const UpdateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      res.status(400).json({ error: "Access Id is required" });
      return;
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { role: "manager" },
      { new: true }
    );

    if (!accessRecord) {
      res.status(404).json({ error: "Access record not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", accessRecord });
  } catch (error) {
    next(error);
  }
};

export const SuspendAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessId } = req.params;

    if (!accessId) {
      res.status(400).json({ error: "Access Id is required" });
      return;
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatus.Suspended },
      { new: true }
    );

    if (!accessRecord) {
      res.status(404).json({ error: "Access record not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Access Suspended Successfully", accessRecord });
  } catch (error) {
    next(error);
  }
};

// This function deletes a user's access to a specific restaurant
export const DeleteAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try {
    const { accessId } = req.params;

    if (!accessId) {
      res.status(400).json({ error: "Access Id is required" });
      return;
    }

    const accessRecord = await RestaurantAccess.findByIdAndUpdate(
      accessId,
      { status: AccessStatus.Innactive },
      { new: true }
    );

    if (!accessRecord) {
      res.status(404).json({ error: "Access record not found" });
      return;
    }
    try {
      const updatedUser = await updateUserUsertype(
        UserType.Guest,
        accessRecord.userId.toString(),
        res
      );

      if (updatedUser?.error) {
        res.status(updatedUser.status).json({ error: updatedUser.error });
        return;
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the user type" });
      return;
    }

    res
      .status(200)
      .json({ message: "Access deleted successfully", accessRecord });
  } catch (error) {
    next(error);
  }
};

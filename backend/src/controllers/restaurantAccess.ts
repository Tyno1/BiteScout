import { NextFunction, Request, Response } from "express";
import RestaurantAccess from "../models/RestaurantAccess.js";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";
import { createAndSendNotification } from "../services/notificationService.js";

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

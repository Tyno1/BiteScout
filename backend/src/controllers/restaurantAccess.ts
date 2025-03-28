import { NextFunction, Request, Response } from "express";
import RestaurantAccess from "../models/RestaurantAccess.js";
import RestaurantData from "../models/RestaurantData.js";
import User from "../models/User.js";
import { createAndSendNotification } from "../services/notificationService.js";

export const RequestAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    if (!restaurantId) {
      res.status(400).json({ error: "restaurant ID is required" });
      return;
    }

    // check if user already has access to the restaurant
    const existingUser = await RestaurantAccess.findOne({
      userId: userId,
      restaurantId: restaurantId,
    });

    if (existingUser) {
      res
        .status(403)
        .json({ error: "User already has access to this restaurant" });
      return;
    }

    // create user restaurant access
    const newRestaurantAccess = await RestaurantAccess.create({
      restaurantId,
      userId,
      role: "staff",
      status: "pending",
    });

    // failed to craete user access
    if (!newRestaurantAccess) {
      res.status(500).json({ error: "Failed to create user access request" });
      return;
    }

    // Find the restaurant to get owner Id
    const restaurant = await RestaurantData.findById(restaurantId);
    if (restaurant && restaurant.ownerId) {
      // Get io and connectedUsers
      const io = req.app.get("io");
      const connectedUsers = req.app.get("connectedUsers");

      // Find the restaurant owner's socket
      const ownerSocketId = connectedUsers.get(restaurant.ownerId.toString());

      if (ownerSocketId) {
        // Find requester info
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
              requesterName: requester ? requester.name : "Unknown user",
              requesterEmail: requester ? requester.email : "",
              requestTime: newRestaurantAccess.createdAt,
            },
          }
        );
      }
    }

    res.status(200).json({
      message: "Authorization request sent successfully",
      restaurantAccess: newRestaurantAccess,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

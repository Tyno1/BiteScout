import { NextFunction, Request, Response } from "express";
import RestaurantAccess from "../models/RestaurantAccess.js";

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

    // create user access
    const userAccess = await RestaurantAccess.create({
      restaurantId,
      userId,
      role: "staff",
      status: "pending",
    });

    // failed to craete user access
    if (!userAccess) {
      res.status(500).json({ error: "Failed to create user access request" });
      return;
    }

    res.status(200).json({
      message: "Authorization request sent successfully",
      userAccess: userAccess,
    });
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

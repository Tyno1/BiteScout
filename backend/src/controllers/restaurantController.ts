import RestaurantData from "../models/RestaurantData.js";
import { Request, Response, NextFunction } from "express";
import { Restaurant } from "@/src/types/restaurantData.js";
import mongoose from "mongoose";

// Helper function to validate request ID
const validateId = (req: Request) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("No id provided");
  }
  return id;
};

export const createNewRestaurant = async (
  req: Request<{}, {}, Restaurant>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;

    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    // Check if a restaurant with the same name already exists
    const existingRestaurant = await RestaurantData.findOne({
      name: { $regex: new RegExp(`^${body.name}$`, "i") }, // Case-insensitive exact match
    });

    if (existingRestaurant) {
      res.status(409).json({
        error: "Duplicate Restaurant. Restaurant with this name already exists",
        existingId: existingRestaurant._id,
      });
      return;
    }

    const newRestaurant = await (RestaurantData as any).create(body);

    if (!newRestaurant) {
      res.status(400).json({ error: "Could not create restaurant" });
      return;
    }

    res.status(201).json(newRestaurant);
  } catch (error) {
    return next(error);
  }
};

export const getRestaurantById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = validateId(req);

    // If ID is provided, return single restaurant
    const restaurant = await (RestaurantData as any).findById(id);

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }

    res.json(restaurant);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allRestaurants = await RestaurantData.find();

    if (!allRestaurants || allRestaurants.length === 0) {
      res.status(404).json({ error: "No restaurants found" });
      return;
    }

    const restaurantList = allRestaurants.map((restaurant: any) => ({
      _id: restaurant._id,
      name: restaurant.name,
      ownerId: restaurant.ownerId,
    }));

    res.json(restaurantList);
  } catch (error) {
    next(error);
  }
};

export const getRestaurantsByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    const searchName = typeof name === "string" ? name : "";

    if (!searchName) {
      res.status(400).json({ error: "No name provided" });
      return;
    }

    const restaurants = await RestaurantData.find({
      name: new RegExp(searchName, "i"), // Simple contains search
    });

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurantData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const body: Partial<Restaurant> = req.body.data || req.body;

    // First check if document exists
    const existingRestaurant = await RestaurantData.findById(id);
    if (!existingRestaurant) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }

    // Then attempt update
    const updatedRestaurant = await RestaurantData.findByIdAndUpdate(
      id,
      { $set: body }, // Use $set to explicitly set only the fields provided
      {
        new: true,
      }
    );

    if (!updatedRestaurant) {
      res.status(404).json({ error: "Restaurant data not updated" });
      return;
    }

    res.json(updatedRestaurant);
    return;
  } catch (error) {
    return next(error);
  }
};

export const getRestaurantByOwnerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(401).json({ error: "User Id is required" });
      return;
    }

    const restaurant = await RestaurantData.findOne({ ownerId: userId });

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const getOwnerRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(401).json({ error: "User Id is required" });
      return;
    }

    const restaurants = await RestaurantData.find({ ownerId: userId });
    if (!restaurants || restaurants.length === 0) {
      res.json([]);
      return;
    }

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

export const deletedRestaurant = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = validateId(req);

    const deletedRestaurant = await (RestaurantData as any).findByIdAndDelete(
      id
    );

    if (!deletedRestaurant) {
      res.status(404).json({ error: "Restaurant data not found" });
      return;
    }

    res.json(deletedRestaurant);
  } catch (error) {
    return next(error);
  }
};

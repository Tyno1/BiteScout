import RestaurantData from "../models/RestaurantData.js";
import { Request, Response, NextFunction } from "express";
import { Restaurant } from "@/src/types/restaurantData.js";

// Helper function to validate request ID
const validateId = (request: Request) => {
  const id = request.params.id;
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
    const body = await req.body;

    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
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

export const updateRestaurantData = async (
  req: Request<{ id: string }, {}, Partial<Restaurant>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const body: Partial<Restaurant> = await req.body;

    const updatedRestaurant = await (RestaurantData as any).findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      res.status(404).json({ error: "Restaurant data not updated" });
      return;
    }

    res.json(updatedRestaurant);
  } catch (error) {
    return next(error);
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

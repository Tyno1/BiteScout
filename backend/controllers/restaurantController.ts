import RestaurantData from "../models/RestaurantData.js";
import { Request, Response } from "express";
import { handleError } from "@/utils/errorHandler.js";

// Helper function to validate request ID
const validateId = (request: Request) => {
  const id = request.params.id;
  if (!id) {
    throw new Error("No id provided");
  }
  return id;
};

export const createNewRestaurant = async (
  request: Request,
  response: Response
) => {
  try {
    const body = await request.body;

    if (!body) {
      return response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const newRestaurant = await (RestaurantData as any).create(body);
    console.log(newRestaurant);

    if (!newRestaurant) {
      return response
        .status(400)
        .json({ error: "Could not create restaurant" });
    }

    return response.status(201).json(newRestaurant);
  } catch (error) {
    return handleError(error, "Failed to Create Restaurant Data", response);
  }
};

export const getRestaurantById = async (
  request: Request,
  response: Response
) => {
  try {
    const id = validateId(request);

    // If ID is provided, return single restaurant
    const restaurant = await (RestaurantData as any).findById(id);

    if (!restaurant) {
      return response.status(404).json({ error: "Restaurant not found" });
    }

    return response.json(restaurant);
  } catch (error: any) {
    return handleError(error, error.message, response);
  }
};

export const getAllRestaurants = async (
  response: Response,
  request: Request
) => {
  try {
    const allRestaurants = await (RestaurantData as any).find();

    if (!allRestaurants || allRestaurants.length === 0) {
      return response.status(404).json({ error: "No restaurants found" });
    }

    const restaurantList = allRestaurants.map((restaurant: any) => ({
      _id: restaurant._id,
      name: restaurant.name,
      ownerId: restaurant.ownerId,
    }));

    response.json(restaurantList);
  } catch (error) {
    return handleError(error, "Failed to fetch all restaurants", response);
  }
};

export const updateRestaurantData = async (
  request: Request,
  response: Response
) => {
  try {
    const id = validateId(request);
    const body = await request.body;

    const updatedRestaurant = await (RestaurantData as any).findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedRestaurant) {
      return response
        .status(404)
        .json({ error: "Restaurant data not updated" });
    }

    return response.json(updatedRestaurant);
  } catch (error) {
    return handleError(error, "Failed to edit Restaurant Data", response);
  }
};

export const deletedRestaurant = async (
  request: Request,
  response: Response
) => {
  try {
    const id = validateId(request);

    const deletedRestaurant = await (RestaurantData as any).findByIdAndDelete(
      id
    );

    if (!deletedRestaurant) {
      return response.status(404).json({ error: "Restaurant data not found" });
    }

    return response.json(deletedRestaurant);
  } catch (error) {
    return handleError(error, "Failed to delete Restaurant Data", response);
  }
};

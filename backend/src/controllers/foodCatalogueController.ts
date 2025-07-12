import { Request, Response, NextFunction } from "express";
import FoodCatalogue from "../models/FoodCatalogue.js";

// get food catalogue by id
export const getFoodCatalogueById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;

    if (!foodId) {
      res.status(400).json({ error: "Missing Food Catalogue Id" });
      return;
    }

    const result = await FoodCatalogue.findById(foodId)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");

    if (!result) {
      res.status(400).json({ error: "Food Catalogue not found" });
      return;
    }
    res.status(200).json(result);
    return;
  } catch (error) {
    return next(error);
  }
};

export const getFoodCatalogueByRestaurantId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      res.status(400).json({ error: "Missing Restaurant Id" });
      return;
    }

    const result = await FoodCatalogue.find({ restaurant: restaurantId })
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");

    if (!result) {
      res.status(400).json({ error: "Food Catalogue not found" });
      return;
    }
    res.status(200).json(result);
    return;
  } catch (error) {
    return next(error);
  }
};

export const createFoodCatalogue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const newFoodItem = await FoodCatalogue.create(body);
    if (!newFoodItem) {
      res.status(400).json({ error: "Failed to create food item" });
      return;
    }

    const populatedFoodItem = await FoodCatalogue.findById(newFoodItem._id)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");

    if (!populatedFoodItem) {
      res
        .status(500)
        .json({ error: "Failed to retrieve the created food item" });
      return;
    }

    res.status(201).json(populatedFoodItem);
  } catch (error) {
    return next(error);
  }
};

export const updateFoodCatalogue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      res.status(400).json({ error: "Missing Food Catalogue Id" });
      return;
    }
    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const updatedFoodItem = await FoodCatalogue.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFoodItem) {
      res.status(404).json({ error: "Food item not found" });
      return;
    }

    res.status(200).json(updatedFoodItem);
    return;
  } catch (error) {
    return next(error);
  }
};

export const deleteFoodCatalogue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Missing Food Catalogue Id" });
      return;
    }

    const deletedFoodItem = await FoodCatalogue.findByIdAndDelete(id);

    if (!deletedFoodItem) {
      res.status(404).json({ error: "Food item not found" });
      return;
    }

    res.status(200).json({ message: "Food item deleted successfully" });
    return;
  } catch (error) {
    return next(error);
  }
};

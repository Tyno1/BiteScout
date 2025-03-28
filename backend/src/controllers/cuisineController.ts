import { Request, Response, NextFunction } from "express";
import CuisineType from "../models/CuisineType.js";

export const getCuisine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cuisineTypes = await CuisineType.find();

    if (!cuisineTypes || cuisineTypes.length === 0) {
      console.log("no cuisine");
      
      res.status(404).json({ error: "No cuisine types found" });
      return;
    }

    res.status(200).json(cuisineTypes);
    return;
  } catch (error) {
    next(error);
  }
};

export const createCuisine = async (
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
    const newCuisineType = await CuisineType.create(body);

    if (!newCuisineType) {
      res.status(400).json({ error: "Failed to create cuisine type" });
      return;
    }

    res.status(201).json(newCuisineType);
    return;
  } catch (error) {
    return next(error);
  }
};

export const updateCuisine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { id } = req.params;
    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    if (!id) {
      res.status(400).json({ error: "Cuisine ID is required" });
      return;
    }

    const updatedCuisineType = await CuisineType.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedCuisineType) {
      res.status(404).json({ error: "Cuisine type not found" });
      return;
    }

    res.status(200).json(updatedCuisineType);
    return;
  } catch (error) {
    return next(error);
  }
};

export const deleteCuisine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }

    const deletedCuisineType = await CuisineType.findByIdAndDelete(id);

    if (!deletedCuisineType) {
      res.status(404).json({ error: "Cuisine type not found" });
      return;
    }

    res.status(200).json({ message: "Cuisine type deleted successfully" });
    return;
  } catch (error) {
    return next(error);
  }
};

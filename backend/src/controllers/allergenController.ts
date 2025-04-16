import { Request, Response, NextFunction } from "express";
import Allergen from "../models/Allergen.js";

export const getAllergens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allergens = await Allergen.find();

    if (!allergens || allergens.length === 0) {
      res.status(404).json({ error: "No allergens found" });
      return;
    }

    res.status(200).json(allergens);
  } catch (error) {
    return next(error);
  }
};

export const getAllergen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Allergen ID is required" });
      return;
    }

    const allergen = await Allergen.findById(id);

    if (!allergen) {
      res.status(404).json({ error: "Allergen not found" });
      return;
    }

    res.status(200).json(allergen);
  } catch (error) {
    return next(error);
  }
};

export const createAllergens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const allergen = await Allergen.create(body);
    if (!allergen) {
      res.status(400).json({ error: "Failed to create allergen" });
      return;
    }

    res.status(201).json(allergen);
  } catch (error: any) {
    return next(error);
  }
};

export const updateAllergens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      res.status(400).json({ error: "Allergen ID is required" });
      return;
    }
    if (!body) {
      res.status(400).json({ error: "Allergen ID is required" });
      return;
    }

    const updatedAllergen = await Allergen.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAllergen) {
      res.status(404).json({ error: "Allergen not found" });
      return;
    }

    res.status(200).json(updatedAllergen);
  } catch (error) {
    return next(error);
  }
};

export const deleteAllergens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Allergen ID is required" });
      return;
    }

    const deletedAllergen = await Allergen.findByIdAndDelete(id);

    if (!deletedAllergen) {
      res.status(404).json({ error: "Allergen not found" });
      return;
    }

    res.json({ message: "Allergen deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

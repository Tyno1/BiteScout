import type {CreateAllergenRequest, CreateAllergenResponse, 
  DeleteAllergenRequest, DeleteAllergenResponse,
  GetAllAllergensResponse,
  GetAllergenByIdRequest, GetAllergenByIdResponse , UpdateAllergenRequest, UpdateAllergenResponse
} from "@shared/types/allergens";
import type { ApiError } from "@shared/types/common/errors.js";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import Allergen from "../models/Allergen.js";

type GetAllAllergenApiResponse = GetAllAllergensResponse | ApiError;
type GetAllergenByIdApiResponse = GetAllergenByIdResponse | ApiError;
type CreateAllergenApiResponse = CreateAllergenResponse | ApiError;
type UpdateAllergenApiResponse = UpdateAllergenResponse | ApiError;
type DeleteAllergenApiResponse = DeleteAllergenResponse | ApiError;

export const getAllergens = async (
  req: Request,
  res: Response<GetAllAllergenApiResponse>,
  next: NextFunction
) => {
  try {
    const allergens = await Allergen.find();

    if (!allergens || allergens.length === 0) {
      return next(createError(ErrorCodes.NOT_FOUND, "No allergens found"));
    }

    res.status(200).json(allergens);
  } catch (error) {
    return next(error);
  }
};

export const getAllergen = async (
  req: Request<GetAllergenByIdRequest>,
  res: Response<GetAllergenByIdApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Allergen ID is required")
      );
    }

    const allergen = await Allergen.findById(id);

    if (!allergen) {
      return next(createError(ErrorCodes.NOT_FOUND, "Allergen not found"));
    }

    res.status(200).json(allergen);
  } catch (error) {
    return next(error);
  }
};

export const createAllergens = async (
  req: Request<CreateAllergenRequest>,
  res: Response<CreateAllergenApiResponse>,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const allergen = await Allergen.create(body);

    if (!allergen) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Failed to create allergen")
      );
    }

    res.status(201).json(allergen);
  } catch (error) {
    return next(error);
  }
};

export const updateAllergens = async (
  req: Request<{ id: string }, unknown, UpdateAllergenRequest>,
  res: Response<UpdateAllergenApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Allergen ID is required")
      );
    }
    if (!body) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Allergen data is required")
      );
    }

    const updatedAllergen = await Allergen.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAllergen) {
      return next(createError(ErrorCodes.NOT_FOUND, "Allergen not found"));
    }

    res.status(200).json(updatedAllergen);
  } catch (error) {
    return next(error);
  }
};

export const deleteAllergens = async (
  req: Request<DeleteAllergenRequest>,
  res: Response<DeleteAllergenApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Allergen ID is required")
      );
    }

    const deletedAllergen = await Allergen.findByIdAndDelete(id);

    if (!deletedAllergen) {
      return next(createError(ErrorCodes.NOT_FOUND, "Allergen not found"));
    }

    res.status(200).json({
      message: "Allergen deleted successfully",
      data: { id: deletedAllergen._id },
    });
  } catch (error) {
    return next(error);
  }
};

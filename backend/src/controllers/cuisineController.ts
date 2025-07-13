import type { ApiError } from "@shared/types/common/errors.js";
import type {
  CreateCuisineRequest,
  CreateCuisineResponse,
  DeleteCuisineRequest,
  DeleteCuisineResponse,
  GetAllCuisinesResponse,
  GetCuisineByIdRequest,
  GetCuisineByIdResponse,
  UpdateCuisineRequest,
  UpdateCuisineResponse,
} from "@shared/types/cuisines";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import CuisineType from "../models/CuisineType.js";

type GetAllCuisinesApiResponse = GetAllCuisinesResponse | ApiError;
type GetCuisineByIdApiResponse = GetCuisineByIdResponse | ApiError;
type CreateCuisineApiResponse = CreateCuisineResponse | ApiError;
type UpdateCuisineApiResponse = UpdateCuisineResponse | ApiError;
type DeleteCuisineApiResponse = DeleteCuisineResponse | ApiError;

export const getCuisine = async (
  req: Request,
  res: Response<GetAllCuisinesApiResponse>,
  next: NextFunction
) => {
  try {
    const cuisineTypes = await CuisineType.find();

    if (!cuisineTypes || cuisineTypes.length === 0) {
      return next(createError(ErrorCodes.NOT_FOUND, "No cuisine types found"));
    }

    res.status(200).json(cuisineTypes);
  } catch (error) {
    return next(error);
  }
};

export const getCuisineById = async (
  req: Request<GetCuisineByIdRequest>,
  res: Response<GetCuisineByIdApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Cuisine ID is required")
      );
    }

    const cuisineType = await CuisineType.findById(id);

    if (!cuisineType) {
      return next(createError(ErrorCodes.NOT_FOUND, "Cuisine type not found"));
    }

    res.status(200).json(cuisineType);
  } catch (error) {
    return next(error);
  }
};

export const createCuisine = async (
  req: Request<Record<string, never>, unknown, CreateCuisineRequest>,
  res: Response<CreateCuisineApiResponse>,
  next: NextFunction
) => {
  try {
    const body = req.body;

    if (!body) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Cuisine data is required")
      );
    }

    const newCuisineType = await CuisineType.create(body);

    if (!newCuisineType) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Failed to create cuisine type")
      );
    }

    res.status(201).json(newCuisineType);
  } catch (error) {
    return next(error);
  }
};

export const updateCuisine = async (
  req: Request<{ id: string }, unknown, UpdateCuisineRequest>,
  res: Response<UpdateCuisineApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Cuisine ID is required")
      );
    }
    if (!body) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Cuisine data is required")
      );
    }

    const updatedCuisineType = await CuisineType.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCuisineType) {
      return next(createError(ErrorCodes.NOT_FOUND, "Cuisine type not found"));
    }

    res.status(200).json(updatedCuisineType);
  } catch (error) {
    return next(error);
  }
};

export const deleteCuisine = async (
  req: Request<DeleteCuisineRequest>,
  res: Response<DeleteCuisineApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Cuisine ID is required")
      );
    }

    const deletedCuisineType = await CuisineType.findByIdAndDelete(id);

    if (!deletedCuisineType) {
      return next(createError(ErrorCodes.NOT_FOUND, "Cuisine type not found"));
    }

    res.status(200).json({
      message: "Cuisine type deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

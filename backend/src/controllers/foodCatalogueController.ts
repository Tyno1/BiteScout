import type { ApiError } from "@shared/types/common/errors.js";
import type {
  CreateFoodCatalogueRequest,
  CreateFoodCatalogueResponse,
  DeleteFoodCatalogueRequest,
  DeleteFoodCatalogueResponse,
  GetAllFoodCatalogueItemsRequest,
  GetAllFoodCatalogueItemsResponse,
  GetFoodCatalogueItemRequest,
  GetFoodCatalogueItemResponse,
  UpdateFoodCatalogueRequest,
  UpdateFoodCatalogueResponse,
} from "@shared/types/restaurant/food-catalogue";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import FoodCatalogue from "../models/FoodCatalogue.js";

type GetFoodCatalogueItemApiResponse = GetFoodCatalogueItemResponse | ApiError;
type GetAllFoodCatalogueItemsApiResponse =
  | GetAllFoodCatalogueItemsResponse
  | ApiError;
type CreateFoodCatalogueApiResponse = CreateFoodCatalogueResponse | ApiError;
type UpdateFoodCatalogueApiResponse = UpdateFoodCatalogueResponse | ApiError;
type DeleteFoodCatalogueApiResponse = DeleteFoodCatalogueResponse | ApiError;

// Get food catalogue by id
export const getFoodCatalogueById = async (
  req: Request<GetFoodCatalogueItemRequest>,
  res: Response<GetFoodCatalogueItemApiResponse>,
  next: NextFunction
) => {
  try {
    const { foodId, restaurantId } = req.params;

    if (!foodId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Food Catalogue ID is required")
      );
    }

    if (!restaurantId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    const result = await FoodCatalogue.findById(foodId)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images");

    if (!result) {
      return next(
        createError(ErrorCodes.NOT_FOUND, "Food Catalogue not found")
      );
    }

    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getFoodCatalogueByRestaurantId = async (
  req: Request<GetAllFoodCatalogueItemsRequest>,
  res: Response<GetAllFoodCatalogueItemsApiResponse>,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    const result = await FoodCatalogue.find({ restaurant: restaurantId })
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images");

    res.status(200).json(result || []);
  } catch (error) {
    return next(error);
  }
};

export const createFoodCatalogue = async (
  req: Request<Record<string, never>, unknown, CreateFoodCatalogueRequest>,
  res: Response<CreateFoodCatalogueApiResponse>,
  next: NextFunction
) => {
  try {
    const body = req.body;

    if (!body) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Invalid request body"));
    }

    		// Remove _id from body to prevent validation errors
		const { _id, ...foodData } = body;
		const newFoodItem = await FoodCatalogue.create(foodData);

    if (!newFoodItem) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Failed to create food item")
      );
    }

    const populatedFoodItem = await FoodCatalogue.findById(newFoodItem._id)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images");

    if (!populatedFoodItem) {
      return next(
        createError(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          "Failed to retrieve the created food item"
        )
      );
    }

    res.status(201).json(populatedFoodItem);
  } catch (error) {
    return next(error);
  }
};

export const updateFoodCatalogue = async (
  req: Request<
    { foodId: string; restaurantId: string },
    unknown,
    UpdateFoodCatalogueRequest
  >,
  res: Response<UpdateFoodCatalogueApiResponse>,
  next: NextFunction
) => {
  try {
    const { foodId, restaurantId } = req.params;
    const body = req.body;

    if (!foodId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Food Catalogue ID is required")
      );
    }

    if (!restaurantId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    if (!body) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Invalid request body"));
    }

    const updatedFoodItem = await FoodCatalogue.findByIdAndUpdate(
      foodId,
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images");

    if (!updatedFoodItem) {
      return next(createError(ErrorCodes.NOT_FOUND, "Food item not found"));
    }

    res.status(200).json(updatedFoodItem);
  } catch (error) {
    return next(error);
  }
};

export const deleteFoodCatalogue = async (
  req: Request<DeleteFoodCatalogueRequest>,
  res: Response<DeleteFoodCatalogueApiResponse>,
  next: NextFunction
) => {
  try {
    const { foodId, restaurantId } = req.params;

    if (!foodId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Food Catalogue ID is required")
      );
    }

    if (!restaurantId) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    const deletedFoodItem = await FoodCatalogue.findByIdAndDelete(foodId);

    if (!deletedFoodItem) {
      return next(createError(ErrorCodes.NOT_FOUND, "Food item not found"));
    }

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

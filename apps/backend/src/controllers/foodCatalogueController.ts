import type { ApiError } from "shared/types/common/errors";
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
} from "shared/types/restaurant/food-catalogue";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import FoodCatalogue from "../models/FoodCatalogue.js";
import RestaurantData from "../models/RestaurantData.js";
import CuisineType from "../models/CuisineType.js";
import Course from "../models/Course.js";
import Allergen from "../models/Allergen.js";

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

/**
 * Search food items across all restaurants
 * Supports filtering by query, cuisine, course, price range, allergens, availability, and featured status
 */
export const searchFoodCatalogue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      q,
      cuisine,
      course,
      priceRange,
      allergens,
      isAvailable,
      isFeatured,
      sortBy = "popularity",
      sortOrder = "desc",
      page = 1,
      limit = 20,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter object
    const filter: Record<string, any> = {};

    // Text search
    if (q && typeof q === "string") {
      filter.$text = { $search: q };
    }

    // Cuisine filter
    if (cuisine && typeof cuisine === "string") {
      // Find cuisine by name and filter by cuisineType ID
      const cuisineDoc = await CuisineType.findOne({ name: new RegExp(cuisine, "i") });
      if (cuisineDoc) {
        filter.cuisineType = cuisineDoc._id;
      }
    }

    // Course filter
    if (course && typeof course === "string") {
      // Find course by name and filter by course ID
      const courseDoc = await Course.findOne({ name: new RegExp(course, "i") });
      if (courseDoc) {
        filter.course = courseDoc._id;
      }
    }

    // Price range filter
    if (priceRange && typeof priceRange === "string") {
      const priceRanges = {
        "$": { $lte: 10 },
        "$$": { $gt: 10, $lte: 25 },
        "$$$": { $gt: 25, $lte: 50 },
        "$$$$": { $gt: 50 }
      };
      if (priceRanges[priceRange as keyof typeof priceRanges]) {
        filter["price.amount"] = priceRanges[priceRange as keyof typeof priceRanges];
      }
    }

    // Allergen filter (exclude foods with specified allergens)
    if (allergens && typeof allergens === "string") {
      const allergenList = allergens.split(",").map((a: string) => a.trim());
      const allergenDocs = await Allergen.find({
        name: { $in: allergenList.map((a: string) => new RegExp(a, "i")) }
      });
      if (allergenDocs.length > 0) {
        filter.allergens = { $nin: allergenDocs.map((a: any) => a._id) };
      }
    }

    // Availability filter
    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    // Featured filter
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }

    // Build sort object
    let sort: Record<string, any> = {};
    switch (sortBy) {
      case "name":
        sort.name = sortOrder === "asc" ? 1 : -1;
        break;
      case "price":
        sort["price.amount"] = sortOrder === "asc" ? 1 : -1;
        break;
      case "popularity":
        sort["analytics.popularityScore"] = sortOrder === "asc" ? 1 : -1;
        break;
      case "rating":
        sort["analytics.averageRating"] = sortOrder === "asc" ? 1 : -1;
        break;
      case "trending":
        sort["analytics.trendingScore"] = sortOrder === "asc" ? 1 : -1;
        break;
      default:
        sort["analytics.popularityScore"] = -1;
    }

    // Execute search query
    const foods = await FoodCatalogue.find(filter)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images")
      .populate("restaurant")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await FoodCatalogue.countDocuments(filter);

    // Get unique restaurant IDs from search results
    const restaurantIds = [...new Set(foods.map(food => food.restaurant))];

    // Get restaurant details
    const restaurants = await RestaurantData.find({
      _id: { $in: restaurantIds }
    }).populate("cuisine");

    // Get available filter options for current results
    const availableFilters = await getAvailableFilters(filter);

    // Update search analytics (increment search views)
    if (foods.length > 0) {
      await FoodCatalogue.updateMany(
        { _id: { $in: foods.map(f => f._id) } },
        { $inc: { "analytics.searchViews": 1 } }
      );
    }

    res.json({
      foods,
      restaurants,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalFoods: total,
        hasNextPage: skip + foods.length < total,
        hasPrevPage: Number(page) > 1,
      },
      filters: {
        applied: {
          ...(q && { q }),
          ...(cuisine && { cuisine }),
          ...(course && { course }),
          ...(priceRange && { priceRange }),
          ...(allergens && { allergens }),
          ...(isAvailable !== undefined && { isAvailable }),
          ...(isFeatured !== undefined && { isFeatured }),
          sortBy,
          sortOrder,
        },
        available: availableFilters,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Test endpoint to verify search functionality
 * This can be removed in production
 */
export const testSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Simple test query to verify the search works
    const testFoods = await FoodCatalogue.find({})
      .populate("course")
      .populate("cuisineType")
      .populate("allergens")
      .populate("images")
      .populate("restaurant")
      .limit(5);

    res.json({
      message: "Food search test successful",
      count: testFoods.length,
      sample: testFoods[0] || null,
      searchEndpoint: "/api/food-catalogue/search",
      availableFilters: {
        cuisines: ["Italian", "Japanese", "Mexican", "Indian", "American"],
        courses: ["starter", "main", "dessert", "appetizer"],
        priceRanges: ["$", "$$", "$$$", "$$$$"],
        sortOptions: ["name", "price", "popularity", "rating", "trending"]
      }
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get available filter options for the current search results
 */
async function getAvailableFilters(currentFilter: Record<string, any>) {
  try {
    // Get all foods matching current filter (without pagination)
    const foods = await FoodCatalogue.find(currentFilter)
      .populate("cuisineType")
      .populate("course")
      .populate("allergens");

    // Extract unique values
    const cuisines = [...new Set(foods.map(f => f.cuisineType?.name).filter(Boolean))];
    const courses = [...new Set(foods.map(f => f.course?.name).filter(Boolean))];
    const priceRanges = [...new Set(foods.map(f => f.priceRange).filter(Boolean))];
    const allergens = [...new Set(foods.flatMap(f => f.allergens?.map((a: any) => a.name) || []).filter(Boolean))];

    return {
      cuisines: cuisines.sort(),
      courses: courses.sort(),
      priceRanges: priceRanges.sort(),
      allergens: allergens.sort(),
    };
  } catch (error) {
    console.error("Error getting available filters:", error);
    return {
      cuisines: [],
      courses: [],
      priceRanges: [],
      allergens: [],
    };
  }
}

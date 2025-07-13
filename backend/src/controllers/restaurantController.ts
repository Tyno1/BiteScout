import type { ApiError } from "@shared/types/common/errors.js";
import type {
  CreateRestaurantRequest,
	CreateRestaurantResponse,
	RestaurantDetailDeleteRequest,
	RestaurantDetailDeleteResponse,
	RestaurantDetailGetRequest,
	RestaurantDetailGetResponse,
	RestaurantDetailPutRequest,
	RestaurantDetailPutResponse,
	RestaurantListGetRequest,
	RestaurantListGetResponse,
} from "@shared/types/restaurant";
import type {
	GetOwnerRestaurantsRequest,
	GetOwnerRestaurantsResponse,
	GetRestaurantByOwnerRequest,
	GetRestaurantByOwnerResponse,
} from "@shared/types/restaurant/get";
import type {
	SearchRestaurantsRequest,
	SearchRestaurantsResponse,
} from "@shared/types/restaurant/search";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import RestaurantData from "../models/RestaurantData.js";

// Combined response types for each endpoint
type RestaurantListGetApiResponse = RestaurantListGetResponse | ApiError;
type CreateRestaurantApiResponse = CreateRestaurantResponse | ApiError;
type RestaurantDetailGetApiResponse = RestaurantDetailGetResponse | ApiError;
type RestaurantDetailPutApiResponse = RestaurantDetailPutResponse | ApiError;
type RestaurantDetailDeleteApiResponse = RestaurantDetailDeleteResponse | ApiError;
type SearchRestaurantsApiResponse = SearchRestaurantsResponse | ApiError;
type GetRestaurantByOwnerApiResponse = GetRestaurantByOwnerResponse | ApiError;
type GetOwnerRestaurantsApiResponse = GetOwnerRestaurantsResponse | ApiError;

/**
 * Creates a new restaurant.
 */
export const createNewRestaurant = async (
	req: Request<unknown, unknown, CreateRestaurantRequest>,
	res: Response<CreateRestaurantApiResponse>,
	next: NextFunction,
): Promise<void> => {
	try {
		const body = req.body;

		if (!body || !body.name) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid request body or missing name"));
		}

		// Check if a restaurant with the same name already exists
		const existingRestaurant = await RestaurantData.findOne({
			name: { $regex: new RegExp(`^${body.name}$`, "i") }, // Case-insensitive exact match
		});

		if (existingRestaurant) {
			return next(
				createError(
					ErrorCodes.CONFLICT,
					"Duplicate Restaurant. Restaurant with this name already exists",
				),
			);
		}

		const newRestaurant = await RestaurantData.create(body);

		if (!newRestaurant) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Could not create restaurant"),
			);
		}

		res.status(201).json(newRestaurant);
	} catch (error) {
		return next(error);
	}
};

/**
 * Gets a restaurant by its ID.
 */
export const getRestaurantById = async (
	req: Request<RestaurantDetailGetRequest>,
	res: Response<RestaurantDetailGetApiResponse>,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required"));
		}

		const restaurant = await RestaurantData.findById(id)
			.populate("logo")
			.populate("gallery")
			.populate("cuisine");

		if (!restaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		res.json(restaurant);
	} catch (error) {
		return next(error);
	}
};

/**
 * Gets all restaurants.
 */
export const getAllRestaurants = async (
	req: Request<RestaurantListGetRequest>,
	res: Response<RestaurantListGetApiResponse>,
	next: NextFunction,
): Promise<void> => {
	try {
		const allRestaurants = await RestaurantData.find()
			.populate("logo")
			.populate("gallery")
			.populate("cuisine");

		if (!allRestaurants || allRestaurants.length === 0) {
			return next(createError(ErrorCodes.NOT_FOUND, "No restaurants found"));
		}

		const restaurantList = allRestaurants.map((restaurant) => ({
			_id: restaurant._id,
			name: restaurant.name,
			ownerId: restaurant.ownerId,
		}));

		res.json(restaurantList);
	} catch (error) {
		return next(error);
	}
};

/**
 * Searches restaurants by name.
 */
export const getRestaurantsByName = async (
	req: Request<SearchRestaurantsRequest>,
	res: Response<SearchRestaurantsApiResponse>,
	next: NextFunction,
) => {
	try {
		const { name } = req.params;

		const searchName = typeof name === "string" ? name : "";

		if (!searchName) {
			return next(createError(ErrorCodes.BAD_REQUEST, "No name provided"));
		}

		const restaurants = await RestaurantData.find({
			name: new RegExp(searchName, "i"), // Simple contains search
		});

		res.json(restaurants);
	} catch (error) {
		return next(error);
	}
};

/**
 * Updates restaurant data.
 */
export const updateRestaurantData = async (
	req: Request<RestaurantDetailGetRequest, unknown, RestaurantDetailPutRequest>,
	res: Response<RestaurantDetailPutApiResponse>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id } = req.params;
		const body = req.body;

		if (!id) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required"));
		}

		// First check if document exists
		const existingRestaurant = await RestaurantData.findById(id);
		if (!existingRestaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		// Then attempt update
		const updatedRestaurant = await RestaurantData.findByIdAndUpdate(
			id,
			{ $set: body }, // Use $set to explicitly set only the fields provided
			{
				new: true,
			},
		)
			.populate("logo")
			.populate("gallery")
			.populate("cuisine");

		if (!updatedRestaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant data not updated"));
		}

		res.json(updatedRestaurant);
	} catch (error) {
		return next(error);
	}
};

/**
 * Gets a restaurant by owner ID.
 */
export const getRestaurantByOwnerId = async (
	req: Request<GetRestaurantByOwnerRequest>,
	res: Response<GetRestaurantByOwnerApiResponse>,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return next(createError(ErrorCodes.BAD_REQUEST, "User ID is required"));
		}

		const restaurant = await RestaurantData.findOne({ ownerId: userId })
			.populate("logo")
			.populate("gallery")
			.populate("cuisine");

		if (!restaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		res.json(restaurant);
	} catch (error) {
		return next(error);
	}
};

/**
 * Gets all restaurants for an owner.
 */
export const getOwnerRestaurants = async (
	req: Request<GetOwnerRestaurantsRequest>,
	res: Response<GetOwnerRestaurantsApiResponse>,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return next(createError(ErrorCodes.BAD_REQUEST, "User ID is required"));
		}

		const restaurants = await RestaurantData.find({ ownerId: userId });
		if (!restaurants || restaurants.length === 0) {
			res.json([]);
			return;
		}

		res.json(restaurants);
	} catch (error) {
		return next(error);
	}
};

/**
 * Deletes a restaurant.
 */
export const deletedRestaurant = async (
	req: Request<RestaurantDetailDeleteRequest>,
	res: Response<RestaurantDetailDeleteApiResponse>,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required"));
		}

		const deletedRestaurant = await RestaurantData.findByIdAndDelete(id);

		if (!deletedRestaurant) {
			return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
		}

		res.status(204).send();
	} catch (error) {
		return next(error);
	}
};

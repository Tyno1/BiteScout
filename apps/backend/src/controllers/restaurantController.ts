import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "shared/types/common/errors";
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
} from "shared/types/restaurant";
import type {
  DeliveryLinksDeleteRequest,
  DeliveryLinksDeleteResponse,
  DeliveryLinksGetRequest,
  DeliveryLinksGetResponse,
  DeliveryLinksPostRequest,
  DeliveryLinksPostResponse,
  DeliveryLinksPutResponse,
} from "shared/types/restaurant/delivery-links";
import type {
  GetOwnerRestaurantsRequest,
  GetOwnerRestaurantsResponse,
  GetRestaurantByOwnerRequest,
  GetRestaurantByOwnerResponse,
} from "shared/types/restaurant/get";
import type {
  SearchRestaurantsRequest,
  SearchRestaurantsResponse,
} from "shared/types/restaurant/search";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import RestaurantData from "../models/RestaurantData.js";

// Define DeliveryLink type locally to avoid module resolution issues
type DeliveryLink = {
  _id?: string;
  name: string;
  url: string;
  type: string;
  platform: string;
  // Add other properties as needed
};
import mongoose from "mongoose";

// Feature categories mapping for filtering
const FEATURE_CATEGORIES: Record<string, string[]> = {
  "Seating & Dining": [
    "Outdoor seating",
    "Indoor dining",
    "Private dining rooms",
    "Bar seating",
    "Counter seating",
    "Rooftop dining",
    "Garden dining",
    "Waterfront dining",
    "Street-side dining",
    "Patio dining",
  ],
  "Service Types": [
    "Take-out",
    "Delivery",
    "Drive-through",
    "Curbside pickup",
    "Catering",
    "Private events",
    "Corporate events",
    "Wedding catering",
    "Party catering",
    "Food trucks",
  ],
  "Technology & Convenience": [
    "Free WiFi",
    "Mobile ordering",
    "Online reservations",
    "Contactless payment",
    "Digital menus",
    "QR code menus",
    "Self-service kiosks",
    "Table service",
    "Counter service",
    "Buffet service",
  ],
  "Accessibility": [
    "Wheelchair accessible",
    "Accessible parking",
    "Accessible restrooms",
    "Braille menus",
    "Service animal friendly",
    "Elevator access",
    "Ramp access",
  ],
  "Entertainment & Atmosphere": [
    "Live music",
    "Sports on TV",
    "Background music",
    "Dance floor",
    "Karaoke",
    "Trivia nights",
    "Comedy nights",
    "Wine tastings",
    "Cooking classes",
    "Chef's table",
  ],
  "Parking & Transportation": [
    "Free parking",
    "Valet parking",
    "Street parking",
    "Parking garage",
    "Bike parking",
    "Near public transit",
    "Uber/Lyft friendly",
  ],
  "Family & Kids": [
    "Kid-friendly",
    "High chairs",
    "Kids menu",
    "Play area",
    "Changing tables",
    "Family restrooms",
    "Birthday parties",
  ],
  "Dietary Accommodations": [
    "Vegetarian options",
    "Vegan options",
    "Gluten-free options",
    "Halal options",
    "Kosher options",
    "Dairy-free options",
    "Nut-free options",
    "Low-sodium options",
    "Organic ingredients",
    "Local ingredients",
  ],
  "Beverages & Bar": [
    "Full bar",
    "Wine list",
    "Craft beer",
    "Cocktails",
    "Happy hour",
    "BYOB",
    "Coffee service",
    "Tea service",
    "Juice bar",
    "Smoothies",
  ],
  "Special Services": [
    "Gift cards",
    "Loyalty program",
    "Rewards program",
    "Group discounts",
    "Student discounts",
    "Senior discounts",
    "Military discounts",
    "Corporate accounts",
    "Catering delivery",
    "Event planning",
  ],
  "Health & Safety": [
    "Contactless delivery",
    "Sanitized surfaces",
    "Staff wearing masks",
    "Temperature checks",
    "Social distancing",
    "Air purification",
    "UV sanitization",
    "Health inspections",
    "Food safety certified",
    "Allergen information",
  ],
  "Payment & Financial": [
    "Credit cards accepted",
    "Cash only",
    "Digital payments",
    "Split bills",
    "Gratuity included",
    "Tipping accepted",
    "Corporate billing",
    "Invoice available",
  ],
  "Hours & Availability": [
    "24/7 service",
    "Late night dining",
    "Breakfast service",
    "Lunch service",
    "Dinner service",
    "Brunch service",
    "Holiday hours",
    "Seasonal hours",
    "Reservations required",
    "Walk-ins welcome",
  ],
  "Special Occasions": [
    "Romantic dining",
    "Anniversary specials",
    "Birthday celebrations",
    "Date night",
    "Business meetings",
    "Networking events",
    "Graduation parties",
    "Holiday parties",
    "Corporate lunches",
    "Team building",
  ],
};

// Combined response types for each endpoint
type RestaurantListGetApiResponse = RestaurantListGetResponse | ApiError;
type RestaurantDetailGetApiResponse = RestaurantDetailGetResponse | ApiError;
type RestaurantDetailPutApiResponse = RestaurantDetailPutResponse | ApiError;
type RestaurantDetailDeleteApiResponse = RestaurantDetailDeleteResponse | ApiError;
type CreateRestaurantApiResponse = CreateRestaurantResponse | ApiError;
type SearchRestaurantsApiResponse = SearchRestaurantsResponse | ApiError;
type GetRestaurantByOwnerApiResponse = GetRestaurantByOwnerResponse | ApiError;
type GetOwnerRestaurantsApiResponse = GetOwnerRestaurantsResponse | ApiError;
type DeliveryLinksGetApiResponse = DeliveryLinksGetResponse | ApiError;
type DeliveryLinksPostApiResponse = DeliveryLinksPostResponse | ApiError;
type DeliveryLinksPutApiResponse = DeliveryLinksPutResponse | ApiError;
type DeliveryLinksDeleteApiResponse = DeliveryLinksDeleteResponse | ApiError;

/**
 * Filter restaurants by various criteria including feature categories
 */
export const filterRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      cuisine,
      priceRange,
      features,
      featureCategories,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter object
    const filter: Record<string, any> = {};

    // Name filter
    if (name && typeof name === "string") {
      filter.name = new RegExp(name, "i");
    }

    // Cuisine filter
    if (cuisine && typeof cuisine === "string") {
      filter.cuisine = cuisine;
    }

    // Price range filter
    if (priceRange && typeof priceRange === "string") {
      filter.priceRange = priceRange;
    }

    // Feature categories filter
    if (featureCategories && typeof featureCategories === "string") {
      const categories = featureCategories.split(",").map(cat => cat.trim());
      const categoryFeatures: string[] = [];
      
      // Convert categories to features
      categories.forEach(category => {
        if (FEATURE_CATEGORIES[category]) {
          categoryFeatures.push(...FEATURE_CATEGORIES[category]);
        }
      });

      if (categoryFeatures.length > 0) {
        filter.features = { $in: categoryFeatures };
      }
    }

    // Specific features filter
    if (features && typeof features === "string") {
      const featureList = features.split(",").map(f => f.trim());
      filter.features = { $in: featureList };
    }

    // Execute query with pagination
    const restaurants = await RestaurantData.find(filter)
      .populate("cuisine")
      .populate("gallery")
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });

    const total = await RestaurantData.countDocuments(filter);

    // Get available filter options for the current result set
    const availableFilters = await getAvailableFilters(filter);

    res.json({
      restaurants,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalRestaurants: total,
        hasNextPage: skip + restaurants.length < total,
        hasPrevPage: Number(page) > 1,
      },
      filters: {
        applied: {
          name: name || null,
          cuisine: cuisine || null,
          priceRange: priceRange || null,
          features: features || null,
          featureCategories: featureCategories || null,
        },
        available: availableFilters,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get available filter options based on current results
 */
async function getAvailableFilters(currentFilter: Record<string, any>) {
  // Get all restaurants that match current filter (without pagination)
  const matchingRestaurants = await RestaurantData.find(currentFilter);
  
  // Extract unique values
  const cuisines = [...new Set(matchingRestaurants.flatMap(r => r.cuisine?.map((c: any) => c.toString()) || []))];
  const priceRanges = [...new Set(matchingRestaurants.map(r => r.priceRange).filter(Boolean))];
  const features = [...new Set(matchingRestaurants.flatMap(r => r.features || []))];
  
  // Group features by category
  const featuresByCategory: Record<string, string[]> = {};
  features.forEach(feature => {
    for (const [category, categoryFeatures] of Object.entries(FEATURE_CATEGORIES)) {
      if (categoryFeatures.includes(feature)) {
        if (!featuresByCategory[category]) {
          featuresByCategory[category] = [];
        }
        featuresByCategory[category].push(feature);
        break;
      }
    }
  });

  return {
    cuisines,
    priceRanges,
    features,
    featureCategories: Object.keys(featuresByCategory),
  };
}

/**
 * Creates a new restaurant.
 */
export const createNewRestaurant = async (
  req: Request<unknown, unknown, CreateRestaurantRequest>,
  res: Response<CreateRestaurantApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;

    if (!body || !body.name) {
      return next(
        createError(
          ErrorCodes.BAD_REQUEST,
          "Invalid request body or missing name"
        )
      );
    }

    // Check if a restaurant with the same name already exists
    const existingRestaurant = await RestaurantData.findOne({
      name: { $regex: new RegExp(`^${body.name}$`, "i") }, // Case-insensitive exact match
    });

    if (existingRestaurant) {
      return next(
        createError(
          ErrorCodes.CONFLICT,
          "Duplicate Restaurant. Restaurant with this name already exists"
        )
      );
    }

    // Remove _id from body to prevent validation errors
    const { _id, ...restaurantData } = body;
    const newRestaurant = await RestaurantData.create(restaurantData);

    if (!newRestaurant) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Could not create restaurant")
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
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    const restaurant = await RestaurantData.findById(id)
      .populate("cuisine")
      .populate("gallery");

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
  next: NextFunction
): Promise<void> => {
  try {
    const allRestaurants = await RestaurantData.find()
      .populate("cuisine")
      .populate("gallery");

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
  next: NextFunction
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
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
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
      }
    )
      .populate("cuisine")
      .populate("gallery");

    if (!updatedRestaurant) {
      return next(
        createError(ErrorCodes.NOT_FOUND, "Restaurant data not updated")
      );
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
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "User ID is required"));
    }

    const restaurant = await RestaurantData.findOne({
      ownerId: new mongoose.Types.ObjectId(userId),
    })
      .populate("cuisine")
      .populate("gallery");

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
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(createError(ErrorCodes.BAD_REQUEST, "User ID is required"));
    }

    const restaurants = await RestaurantData.find({
      ownerId: new mongoose.Types.ObjectId(userId),
    });
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
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
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

/**
 * Get delivery links for a restaurant
 */
export const getDeliveryLinks = async (
  req: Request<DeliveryLinksGetRequest>,
  res: Response<DeliveryLinksGetResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        createError(ErrorCodes.BAD_REQUEST, "Restaurant ID is required")
      );
    }

    const restaurant = await RestaurantData.findById(id).select(
      "deliveryLinks"
    );

    if (!restaurant) {
      return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
    }

    const deliveryLinks: DeliveryLinksGetResponse =
      restaurant.deliveryLinks || [];
    res.status(200).json(deliveryLinks);
  } catch (error) {
    return next(error);
  }
};

/**
 * Add a delivery link to a restaurant
 */
export const addDeliveryLink = async (
  req: Request<{ id: string }, unknown, DeliveryLinksPostRequest>,
  res: Response<DeliveryLinksPostResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, url, platform, isActive = true } = req.body;

    if (!name || !url || !platform) {
      return next(
        createError(
          ErrorCodes.BAD_REQUEST,
          "Name, URL, and platform are required"
        )
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return next(createError(ErrorCodes.BAD_REQUEST, "Invalid URL format"));
    }

    // Validate platform enum
    const validPlatforms = [
      "Uber Eats",
      "DoorDash",
      "Grubhub",
      "Postmates",
      "Instacart",
      "Amazon Fresh",
      "Walmart Grocery",
      "Shipt",
      "Custom",
      "Other",
    ];
    if (!validPlatforms.includes(platform)) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Invalid platform"));
    }

    const restaurant = await RestaurantData.findById(id);
    if (!restaurant) {
      return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
    }

    // Check for duplicate delivery link
    const existingLink = restaurant.deliveryLinks?.find(
      (link: DeliveryLink) => link.name === name && link.platform === platform
    );
    if (existingLink) {
      return next(
        createError(
          ErrorCodes.CONFLICT,
          "Delivery link with this name and platform already exists"
        )
      );
    }

    const newDeliveryLink = {
      name,
      url,
      platform,
      isActive,
    };

    restaurant.deliveryLinks = restaurant.deliveryLinks || [];
    restaurant.deliveryLinks.push(newDeliveryLink);
    await restaurant.save();

    const addedLink =
      restaurant.deliveryLinks[restaurant.deliveryLinks.length - 1];

    const response: DeliveryLinksPostResponse = {
      _id: addedLink._id.toString(),
      restaurantId: id,
      name: addedLink.name,
      url: addedLink.url,
      platform: addedLink.platform,
      isActive: addedLink.isActive,
      createdAt: addedLink.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: addedLink.updatedAt?.toISOString() || new Date().toISOString(),
    };

    res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};

/**
 * Update a delivery link
 */
export const updateDeliveryLink = async (
  req: Request<
    { id: string; linkId: string },
    unknown,
    Partial<DeliveryLinksPostRequest>
  >,
  res: Response<DeliveryLinksPutResponse>,
  next: NextFunction
) => {
  try {
    const { id, linkId } = req.params;
    const { name, url, platform, isActive } = req.body;

    if (!id || !linkId) {
      return next(
        createError(
          ErrorCodes.BAD_REQUEST,
          "Restaurant ID and Link ID are required"
        )
      );
    }

    const restaurant = await RestaurantData.findById(id);
    if (!restaurant) {
      return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
    }

    const deliveryLink = restaurant.deliveryLinks?.id(linkId);
    if (!deliveryLink) {
      return next(createError(ErrorCodes.NOT_FOUND, "Delivery link not found"));
    }

    // Validate URL format if provided
    if (url) {
      try {
        new URL(url);
      } catch {
        return next(createError(ErrorCodes.BAD_REQUEST, "Invalid URL format"));
      }
    }

    // Validate platform enum if provided
    if (platform) {
      const validPlatforms = [
        "Uber Eats",
        "DoorDash",
        "Grubhub",
        "Postmates",
        "Instacart",
        "Amazon Fresh",
        "Walmart Grocery",
        "Shipt",
        "Custom",
        "Other",
      ];
      if (!validPlatforms.includes(platform)) {
        return next(createError(ErrorCodes.BAD_REQUEST, "Invalid platform"));
      }
    }

    // Check for duplicate delivery link if name or platform is being updated
    if (name || platform) {
      const duplicateLink = restaurant.deliveryLinks?.find(
        (link: DeliveryLink) =>
          link._id?.toString() !== linkId &&
          link.name === (name || deliveryLink.name) &&
          link.platform === (platform || deliveryLink.platform)
      );
      if (duplicateLink) {
        return next(
          createError(
            ErrorCodes.CONFLICT,
            "Delivery link with this name and platform already exists"
          )
        );
      }
    }

    // Update fields
    if (name !== undefined) deliveryLink.name = name;
    if (url !== undefined) deliveryLink.url = url;
    if (platform !== undefined) deliveryLink.platform = platform;
    if (isActive !== undefined) deliveryLink.isActive = isActive;

    await restaurant.save();

    const response: DeliveryLinksPutResponse = {
      _id: deliveryLink._id.toString(),
      restaurantId: id,
      name: deliveryLink.name,
      url: deliveryLink.url,
      platform: deliveryLink.platform,
      isActive: deliveryLink.isActive,
      createdAt:
        deliveryLink.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt:
        deliveryLink.updatedAt?.toISOString() || new Date().toISOString(),
    };

    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete a delivery link
 */
export const deleteDeliveryLink = async (
  req: Request<DeliveryLinksDeleteRequest>,
  res: Response<DeliveryLinksDeleteResponse>,
  next: NextFunction
) => {
  try {
    const { id, linkId } = req.params;

    if (!id || !linkId) {
      return next(
        createError(
          ErrorCodes.BAD_REQUEST,
          "Restaurant ID and Link ID are required"
        )
      );
    }

    const restaurant = await RestaurantData.findById(id);
    if (!restaurant) {
      return next(createError(ErrorCodes.NOT_FOUND, "Restaurant not found"));
    }

    const deliveryLink = restaurant.deliveryLinks?.id(linkId);
    if (!deliveryLink) {
      return next(createError(ErrorCodes.NOT_FOUND, "Delivery link not found"));
    }

    deliveryLink.deleteOne();
    await restaurant.save();

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

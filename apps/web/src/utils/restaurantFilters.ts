import type { Restaurant, RestaurantFeature } from "shared/types/api/schemas";
import { FEATURE_CATEGORIES } from "./featureUtils";

export interface FilterOptions {
  name?: string;
  cuisine?: string;
  priceRange?: string;
  features?: string[];
  featureCategories?: string[];
  page?: number;
  limit?: number;
}

export interface FilterResponse {
  restaurants: Restaurant[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRestaurants: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    applied: FilterOptions;
    available: {
      cuisines: string[];
      priceRanges: string[];
      features: string[];
      featureCategories: string[];
    };
  };
}

/**
 * Convert feature categories to individual features for API filtering
 */
export function categoriesToFeatures(categories: string[]): string[] {
  const features: string[] = [];
  categories.forEach((category) => {
    if (FEATURE_CATEGORIES[category]) {
      features.push(...(FEATURE_CATEGORIES[category] as string[]));
    }
  });
  return features;
}

/**
 * Convert individual features to categories for display
 */
export function featuresToCategories(features: string[]): string[] {
  const categories = new Set<string>();
  features.forEach((feature) => {
    for (const [category, categoryFeatures] of Object.entries(FEATURE_CATEGORIES)) {
      if ((categoryFeatures as string[]).includes(feature)) {
        categories.add(category);
        break;
      }
    }
  });
  return Array.from(categories);
}

/**
 * Build query parameters for the filter API
 */
export function buildFilterQuery(options: FilterOptions): Record<string, string> {
  const query: Record<string, string> = {};

  if (options.name) query.name = options.name;
  if (options.cuisine) query.cuisine = options.cuisine;
  if (options.priceRange) query.priceRange = options.priceRange;
  if (options.page) query.page = options.page.toString();
  if (options.limit) query.limit = options.limit.toString();

  // Handle features
  if (options.features && options.features.length > 0) {
    query.features = options.features.join(",");
  }

  // Handle feature categories
  if (options.featureCategories && options.featureCategories.length > 0) {
    query.featureCategories = options.featureCategories.join(",");
  }

  return query;
}

/**
 * Check if a restaurant matches specific feature categories
 */
export function restaurantMatchesCategories(restaurant: Restaurant, categories: string[]): boolean {
  if (!categories.length || !restaurant.features) return true;

  const requiredFeatures = categoriesToFeatures(categories);
  return requiredFeatures.some((feature) =>
    restaurant.features?.includes(feature as RestaurantFeature)
  );
}

/**
 * Get restaurants that match specific feature categories (client-side filtering)
 */
export function filterRestaurantsByCategories(
  restaurants: Restaurant[],
  categories: string[]
): Restaurant[] {
  if (!categories.length) return restaurants;

  return restaurants.filter((restaurant) => restaurantMatchesCategories(restaurant, categories));
}

/**
 * Get available categories from a list of restaurants
 */
export function getAvailableCategories(restaurants: Restaurant[]): string[] {
  const allFeatures = restaurants.flatMap((r) => r.features || []);
  return featuresToCategories(allFeatures);
}

/**
 * Get restaurants with specific features (client-side filtering)
 */
export function filterRestaurantsByFeatures(
  restaurants: Restaurant[],
  features: string[]
): Restaurant[] {
  if (!features.length) return restaurants;

  return restaurants.filter((restaurant) =>
    features.some((feature) => restaurant.features?.includes(feature as RestaurantFeature))
  );
}

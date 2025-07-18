// Food Search Types - Cross-restaurant food search functionality
import type { paths } from '../api';

// Use generated types directly from OpenAPI
export type FoodSearchRequest = paths['/api/food-catalogue/search']['get']['parameters']['query'];
export type FoodSearchResponse = paths['/api/food-catalogue/search']['get']['responses']['200']['content']['application/json'];

// Extract specific types from the response
export type FoodSearchResult = {
  food: NonNullable<FoodSearchResponse['foods']>[0];
  restaurant: NonNullable<FoodSearchResponse['restaurants']>[0];
}; 
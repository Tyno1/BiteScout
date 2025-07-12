// Food Catalogue Get Types - All food catalogue get-related request, response, and error types
import type { paths } from '../../generated';

// Get Food Catalogue By Restaurant
export type GetFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['parameters']['path'];
export type GetFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['responses']['200'];

// Get Food Catalogue Item
export type GetFoodCatalogueItemRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['parameters']['path'];
export type GetFoodCatalogueItemResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['responses']['200']; 
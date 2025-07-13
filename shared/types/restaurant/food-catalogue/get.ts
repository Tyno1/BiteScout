// Food Catalogue Get Types - All food catalogue get-related request, response, and error types
import type { paths } from '../../api';

// Get Food Catalogue Item
export type GetFoodCatalogueItemRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['parameters']['path'];
export type GetFoodCatalogueItemResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['responses']['200']['content']['application/json'];

// Get All Food Catalogue Items
export type GetAllFoodCatalogueItemsRequest = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['parameters']['path'];
export type GetAllFoodCatalogueItemsResponse = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['responses']['200']['content']['application/json']; 
// Food Catalogue Update Types - All food catalogue update-related request, response, and error types
import type { paths } from '../../generated';

// Request
export type UpdateFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['put']['responses']['200']; 
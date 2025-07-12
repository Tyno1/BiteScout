// Food Catalogue Delete Types - All food catalogue delete-related request, response, and error types
import type { paths } from '../../generated';

// Request
export type DeleteFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['delete']['parameters']['path'];

// Response
export type DeleteFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['delete']['responses']['204']; 
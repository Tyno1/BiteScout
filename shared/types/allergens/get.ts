// Allergens GET Types - All allergens get-related request, response, and error types
import type { paths } from '../api';

// Get All Allergens
export type GetAllAllergensResponse = paths['/api/allergens']['get']['responses']['200']['content']['application/json'];

// Get Allergen By ID
export type GetAllergenByIdRequest = paths['/api/allergens/{id}']['get']['parameters']['path'];
export type GetAllergenByIdResponse = paths['/api/allergens/{id}']['get']['responses']['200']['content']['application/json']; 
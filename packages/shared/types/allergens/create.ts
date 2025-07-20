// Allergens CREATE Types - All allergens creation-related request, response, and error types
import type { paths } from '../api';

// Request
export type CreateAllergenRequest = paths['/api/allergens']['post']['requestBody']['content']['application/json'];

// Response
export type CreateAllergenResponse = paths['/api/allergens']['post']['responses']['201']['content']['application/json']; 
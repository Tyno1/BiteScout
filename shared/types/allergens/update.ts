// Allergens UPDATE Types - All allergens update-related request, response, and error types
import type { paths } from '../api';

// Request
export type UpdateAllergenRequest = paths['/api/allergens/{id}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateAllergenResponse = paths['/api/allergens/{id}']['put']['responses']['200']['content']['application/json']; 
// Allergens DELETE Types - All allergens delete-related request, response, and error types
import type { paths } from '../api';

// Request
export type DeleteAllergenRequest = paths['/api/allergens/{id}']['delete']['parameters']['path'];

// Response
export type DeleteAllergenResponse = paths['/api/allergens/{id}']['delete']['responses']['200']['content']['application/json']; 
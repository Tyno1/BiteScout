// Restaurant Update Types - All restaurant update-related request, response, and error types
import type { paths } from '../api';

// Request
export type UpdateRestaurantRequest = paths['/api/restaurants/{id}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateRestaurantResponse = paths['/api/restaurants/{id}']['put']['responses']['200']['content']['application/json']; 
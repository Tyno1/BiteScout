// Restaurant Delete Types - All restaurant delete-related request, response, and error types
import type { paths } from '../generated';

// Request
export type DeleteRestaurantRequest = paths['/api/restaurants/{id}']['delete']['parameters']['path'];

// Response
export type DeleteRestaurantResponse = paths['/api/restaurants/{id}']['delete']['responses']['204']; 
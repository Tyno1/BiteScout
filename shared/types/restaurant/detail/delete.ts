// Restaurant Detail DELETE Types - DELETE /api/restaurants/{id} request, response, and error types
import type { paths } from '../../api';

// Request
export type RestaurantDetailDeleteRequest = paths['/api/restaurants/{id}']['delete']['parameters']['path'];

// Response
export type RestaurantDetailDeleteResponse = paths['/api/restaurants/{id}']['delete']['responses']['204']; 
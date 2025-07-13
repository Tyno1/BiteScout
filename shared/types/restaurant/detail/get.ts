// Restaurant Detail GET Types - GET /api/restaurants/{id} request, response, and error types
import type { paths } from '../../api';

// Request
export type RestaurantDetailGetRequest = paths['/api/restaurants/{id}']['get']['parameters']['path'];

// Response
export type RestaurantDetailGetResponse = paths['/api/restaurants/{id}']['get']['responses']['200']['content']['application/json']; 
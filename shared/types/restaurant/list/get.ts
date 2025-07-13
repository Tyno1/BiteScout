// Restaurant List GET Types - GET /api/restaurants request, response, and error types
import type { paths } from '../../api';

// Request (no parameters for this endpoint)
export type RestaurantListGetRequest = Record<string, never>;

// Response
export type RestaurantListGetResponse = paths['/api/restaurants']['get']['responses']['200']['content']['application/json']; 
// Restaurant Search Types - All restaurant search-related request, response, and error types
import type { paths } from '../api';

// Request
export type SearchRestaurantsRequest = paths['/api/restaurants/search/{name}']['get']['parameters']['path'];

// Response
export type SearchRestaurantsResponse = paths['/api/restaurants/search/{name}']['get']['responses']['200']['content']['application/json']; 
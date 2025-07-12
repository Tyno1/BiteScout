// Restaurant Search Types - All restaurant search-related request, response, and error types
import type { paths } from '../generated';

// Request
export type SearchRestaurantsRequest = paths['/api/restaurants/search']['get']['parameters']['query'];

// Response
export type SearchRestaurantsResponse = paths['/api/restaurants/search']['get']['responses']['200']; 
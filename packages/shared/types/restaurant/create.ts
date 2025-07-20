// Restaurant Create Types - All restaurant creation-related request, response, and error types
import type { paths } from '../api';

// Request
export type CreateRestaurantRequest = paths['/api/restaurants']['post']['requestBody']['content']['application/json'];

// Response
export type CreateRestaurantResponse = paths['/api/restaurants']['post']['responses']['201']['content']['application/json']; 
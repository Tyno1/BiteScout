// Restaurant List POST Types - POST /api/restaurants request, response, and error types
import type { paths } from '../../api';

// Request
export type RestaurantListPostRequest = paths['/api/restaurants']['post']['requestBody']['content']['application/json'];

// Response
export type RestaurantListPostResponse = paths['/api/restaurants']['post']['responses']['201']['content']['application/json']; 
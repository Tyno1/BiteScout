// Restaurant Access Request Types - All access request-related request, response, and error types
import type { paths } from '../api';

// Request
export type RequestRestaurantAccessRequest = paths['/api/restaurant-access/{restaurantId}']['post']['requestBody']['content']['application/json'];

// Response
export type RequestRestaurantAccessResponse = paths['/api/restaurant-access/{restaurantId}']['post']['responses']['201']['content']['application/json']; 
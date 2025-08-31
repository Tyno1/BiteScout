// Restaurant Assigned Images Types - PUT /api/restaurants/{id}/assigned-images request, response, and error types
import type { paths } from '../../api';

// Request
export type RestaurantAssignedImagesPutRequest = paths['/api/restaurants/{id}/assigned-images']['put']['requestBody']['content']['application/json'];

// Response
export type RestaurantAssignedImagesPutResponse = paths['/api/restaurants/{id}/assigned-images']['put']['responses']['200']['content']['application/json'];

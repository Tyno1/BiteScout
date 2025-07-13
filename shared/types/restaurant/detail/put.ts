// Restaurant Detail PUT Types - PUT /api/restaurants/{id} request, response, and error types
import type { paths } from '../../api';

// Request
export type RestaurantDetailPutRequest = paths['/api/restaurants/{id}']['put']['requestBody']['content']['application/json'];

// Response
export type RestaurantDetailPutResponse = paths['/api/restaurants/{id}']['put']['responses']['200']['content']['application/json']; 
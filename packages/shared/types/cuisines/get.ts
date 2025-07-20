// Cuisines GET Types - All cuisines get-related request, response, and error types
import type { paths } from '../api';

// Get All Cuisines
export type GetAllCuisinesResponse = paths['/api/cuisines']['get']['responses']['200']['content']['application/json'];

// Get Cuisine By ID
export type GetCuisineByIdRequest = paths['/api/cuisines/{id}']['get']['parameters']['path'];
export type GetCuisineByIdResponse = paths['/api/cuisines/{id}']['get']['responses']['200']['content']['application/json']; 
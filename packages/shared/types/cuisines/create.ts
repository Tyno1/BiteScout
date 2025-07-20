// Cuisines CREATE Types - All cuisines creation-related request, response, and error types
import type { paths } from '../api';

// Request
export type CreateCuisineRequest = paths['/api/cuisines']['post']['requestBody']['content']['application/json'];

// Response
export type CreateCuisineResponse = paths['/api/cuisines']['post']['responses']['201']['content']['application/json']; 
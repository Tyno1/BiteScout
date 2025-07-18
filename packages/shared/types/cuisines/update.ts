// Cuisines UPDATE Types - All cuisines update-related request, response, and error types
import type { paths } from '../api';

// Request
export type UpdateCuisineRequest = paths['/api/cuisines/{id}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateCuisineResponse = paths['/api/cuisines/{id}']['put']['responses']['200']['content']['application/json']; 
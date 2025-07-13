// Cuisines DELETE Types - All cuisines delete-related request, response, and error types
import type { paths } from '../api';

// Request
export type DeleteCuisineRequest = paths['/api/cuisines/{id}']['delete']['parameters']['path'];

// Response
export type DeleteCuisineResponse = paths['/api/cuisines/{id}']['delete']['responses']['200']['content']['application/json']; 
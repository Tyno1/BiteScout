// User Update Types - All user update-related request, response, and error types
import type { paths } from '../generated';

// Request
export type UpdateUserRequest = paths['/api/user/{userId}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateUserResponse = paths['/api/user/{userId}']['put']['responses']['200']['content']['application/json'];

// Errors
export type UpdateUserError400 = paths['/api/user/{userId}']['put']['responses']['400']['content']['application/json'];
export type UpdateUserError404 = paths['/api/user/{userId}']['put']['responses']['404']['content']['application/json']; 
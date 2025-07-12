// Login Types - All login-related request, response, and error types
import type { paths } from '../generated';

// Request
export type LoginRequest = paths['/api/auth/login']['post']['requestBody']['content']['application/json'];

// Response
export type LoginResponse = paths['/api/auth/login']['post']['responses']['200']['content']['application/json'];

// Errors
export type LoginError400 = paths['/api/auth/login']['post']['responses']['400']['content']['application/json']; 
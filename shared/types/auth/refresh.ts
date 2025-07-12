// Refresh Token Types - All refresh token-related request, response, and error types
import type { paths } from '../generated';

// Request
export type RefreshTokenRequest = paths['/api/auth/refresh']['post']['requestBody']['content']['application/json'];

// Response
export type RefreshTokenResponse = paths['/api/auth/refresh']['post']['responses']['200']['content']['application/json'];

// Errors
export type RefreshTokenError400 = paths['/api/auth/refresh']['post']['responses']['400']['content']['application/json'];
export type RefreshTokenError401 = paths['/api/auth/refresh']['post']['responses']['401']['content']['application/json']; 
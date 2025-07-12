// Register Types - All register-related request, response, and error types
import type { paths } from '../generated';

// Request
export type RegisterRequest = paths['/api/auth/register']['post']['requestBody']['content']['application/json'];

// Response
export type RegisterResponse = paths['/api/auth/register']['post']['responses']['201']['content']['application/json'];

// Errors
export type RegisterError400 = paths['/api/auth/register']['post']['responses']['400']['content']['application/json'];
export type RegisterError409 = paths['/api/auth/register']['post']['responses']['409']['content']['application/json']; 
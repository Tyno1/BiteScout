// Register POST Types - POST /api/auth/register request and response types
import type { paths } from '../../api';

// Request
export type RegisterPostRequest = paths['/api/auth/register']['post']['requestBody']['content']['application/json'];

// Response
export type RegisterPostResponse = paths['/api/auth/register']['post']['responses']['201']['content']['application/json']; 
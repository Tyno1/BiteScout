// Refresh POST Types - POST /api/auth/refresh request and response types
import type { paths } from '../../api';

// Request
export type RefreshPostRequest = paths['/api/auth/refresh']['post']['requestBody']['content']['application/json'];

// Response
export type RefreshPostResponse = paths['/api/auth/refresh']['post']['responses']['200']['content']['application/json']; 
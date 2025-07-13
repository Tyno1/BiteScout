// Login POST Types - POST /api/auth/login request and response types
import type { paths } from '../../api';

// Request
export type LoginPostRequest = paths['/api/auth/login']['post']['requestBody']['content']['application/json'];

// Response
export type LoginPostResponse = paths['/api/auth/login']['post']['responses']['200']['content']['application/json']; 
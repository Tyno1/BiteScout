import type { paths } from '../api';

// POST /api/media/{id}/verify
export type VerifyMediaRequest = paths['/api/media/{id}/verify']['post']['requestBody']['content']['application/json'];
export type VerifyMediaResponse = paths['/api/media/{id}/verify']['post']['responses']['200']['content']['application/json']; 
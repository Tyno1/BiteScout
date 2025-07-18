import type { paths } from '../api';

// PATCH /api/media/{id}/verify
export type VerifyMediaRequest = paths['/api/media/{id}/verify']['patch']['parameters']['path'];
export type VerifyMediaResponse = paths['/api/media/{id}/verify']['patch']['responses']['200']['content']['application/json']; 
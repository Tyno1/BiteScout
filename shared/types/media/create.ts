import type { paths } from '../api';

// POST /api/media
export type CreateMediaRequest = paths['/api/media']['post']['requestBody']['content']['application/json'];
export type CreateMediaResponse = paths['/api/media']['post']['responses']['201']['content']['application/json']; 
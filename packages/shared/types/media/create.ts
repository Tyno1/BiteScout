import type { paths } from '../api';

// POST /api/media (JSON metadata)
export type CreateMediaRequest = paths['/api/media']['post']['requestBody']['content']['application/json'];
export type CreateMediaResponse = paths['/api/media']['post']['responses']['201']['content']['application/json'];

// POST /api/media/upload (File upload - Hybrid Architecture)
export type UploadMediaRequest = paths['/api/media/upload']['post']['requestBody']['content']['multipart/form-data'];
export type UploadMediaResponse = paths['/api/media/upload']['post']['responses']['201']['content']['application/json']; 
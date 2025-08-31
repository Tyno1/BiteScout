import type { paths } from '../api';

// POST /api/media (JSON metadata)
export type CreateMediaRequest = paths['/api/media']['post']['requestBody']['content']['application/json'];
export type CreateMediaResponse = paths['/api/media']['post']['responses']['201']['content']['application/json'];

// Note: /api/media/upload endpoint doesn't exist in the backend
// Media uploads are handled by the media service directly, then metadata is synced via /api/media 
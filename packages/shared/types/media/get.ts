import type { paths } from '../api';

// GET /api/media/{id}
export type GetMediaRequest = paths['/api/media/{id}']['get']['parameters']['path'];
export type GetMediaResponse = paths['/api/media/{id}']['get']['responses']['200']['content']['application/json']; 
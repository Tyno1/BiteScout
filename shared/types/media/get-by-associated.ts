import type { paths } from '../api';

// GET /api/media/associated/{type}/{id}
export type GetMediaByAssociatedRequest = paths['/api/media/associated/{type}/{id}']['get']['parameters']['path'];
export type GetMediaByAssociatedResponse = paths['/api/media/associated/{type}/{id}']['get']['responses']['200']['content']['application/json']; 
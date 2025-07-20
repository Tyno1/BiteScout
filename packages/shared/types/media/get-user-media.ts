import type { paths } from '../api';

// GET /api/media/user/{userId}
export type GetUserMediaRequest = paths['/api/media/user/{userId}']['get']['parameters']['path'] & paths['/api/media/user/{userId}']['get']['parameters']['query'];
export type GetUserMediaResponse = paths['/api/media/user/{userId}']['get']['responses']['200']['content']['application/json']; 
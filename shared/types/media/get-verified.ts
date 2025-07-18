import type { paths } from '../api';

// GET /api/media/verified
export type GetVerifiedMediaRequest = paths['/api/media/verified']['get']['parameters']['query'];
export type GetVerifiedMediaResponse = paths['/api/media/verified']['get']['responses']['200']['content']['application/json']; 
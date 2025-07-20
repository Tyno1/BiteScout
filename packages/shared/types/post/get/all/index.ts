import type { paths } from '../../../api';

// GET /api/posts
export type GetAllPostsRequest = paths['/api/posts']['get']['parameters']['query'];
export type GetAllPostsResponse = paths['/api/posts']['get']['responses']['200']['content']['application/json']; 
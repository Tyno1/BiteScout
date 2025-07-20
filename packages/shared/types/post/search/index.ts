import type { paths } from '../../api';

// GET /api/posts/search
export type SearchPostsRequest = paths['/api/posts/search']['get']['parameters']['query'];
export type SearchPostsResponse = paths['/api/posts/search']['get']['responses']['200']['content']['application/json'];
export type SearchPostsErrorResponse = paths['/api/posts/search']['get']['responses']['400']['content']['application/json']; 
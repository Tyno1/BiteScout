import type { paths } from '../../../api';

// GET /api/posts/{id}
export type GetPostRequest = paths['/api/posts/{id}']['get']['parameters']['path'];
export type GetPostResponse = paths['/api/posts/{id}']['get']['responses']['200']['content']['application/json'];
export type GetPostErrorResponse = paths['/api/posts/{id}']['get']['responses']['404']['content']['application/json']; 
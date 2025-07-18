import type { paths } from '../../api';

// POST /api/posts/{id}/like
export type LikePostRequest = paths['/api/posts/{id}/like']['post']['parameters']['path'];
export type LikePostResponse = paths['/api/posts/{id}/like']['post']['responses']['200']['content']['application/json'];
export type LikePostErrorResponse = paths['/api/posts/{id}/like']['post']['responses']['401']['content']['application/json'] |
                                   paths['/api/posts/{id}/like']['post']['responses']['404']['content']['application/json']; 
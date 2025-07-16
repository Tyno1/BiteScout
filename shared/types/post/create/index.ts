import type { paths } from '../../api';

// POST /api/posts
export type CreatePostRequest = paths['/api/posts']['post']['requestBody']['content']['application/json'];
export type CreatePostResponse = paths['/api/posts']['post']['responses']['201']['content']['application/json'];
export type CreatePostErrorResponse = paths['/api/posts']['post']['responses']['400']['content']['application/json'] | 
                                     paths['/api/posts']['post']['responses']['401']['content']['application/json'] |
                                     paths['/api/posts']['post']['responses']['500']['content']['application/json']; 
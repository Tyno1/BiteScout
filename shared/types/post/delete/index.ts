import type { paths } from '../../api';

// DELETE /api/posts/{id}
export type DeletePostRequest = paths['/api/posts/{id}']['delete']['parameters']['path'];
export type DeletePostResponse = void; // 204 No Content
export type DeletePostErrorResponse = paths['/api/posts/{id}']['delete']['responses']['401']['content']['application/json'] |
                                     paths['/api/posts/{id}']['delete']['responses']['403']['content']['application/json'] |
                                     paths['/api/posts/{id}']['delete']['responses']['404']['content']['application/json']; 
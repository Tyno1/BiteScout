import type { paths } from '../../api';

// PUT /api/posts/{id}
export type UpdatePostRequest = paths['/api/posts/{id}']['put']['requestBody']['content']['application/json'];
export type UpdatePostResponse = paths['/api/posts/{id}']['put']['responses']['200']['content']['application/json'];
export type UpdatePostErrorResponse = paths['/api/posts/{id}']['put']['responses']['400']['content']['application/json'] |
                                     paths['/api/posts/{id}']['put']['responses']['403']['content']['application/json'] |
                                     paths['/api/posts/{id}']['put']['responses']['404']['content']['application/json']; 
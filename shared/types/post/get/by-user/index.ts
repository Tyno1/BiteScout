import type { paths } from '../../../api';

// GET /api/posts/user/{userId}
export type GetUserPostsRequest = paths['/api/posts/user/{userId}']['get']['parameters']['path'];
export type GetUserPostsResponse = paths['/api/posts/user/{userId}']['get']['responses']['200']['content']['application/json']; 
import type { paths } from '../../../api';

// POST /api/posts/{postId}/tag-food
export type TagFoodRequest = paths['/api/posts/{postId}/tag-food']['post']['requestBody']['content']['application/json'];
export type TagFoodResponse = paths['/api/posts/{postId}/tag-food']['post']['responses']['200']['content']['application/json'];
export type TagFoodErrorResponse = paths['/api/posts/{postId}/tag-food']['post']['responses']['400']['content']['application/json'] |
                                  paths['/api/posts/{postId}/tag-food']['post']['responses']['401']['content']['application/json'] |
                                  paths['/api/posts/{postId}/tag-food']['post']['responses']['403']['content']['application/json'] |
                                  paths['/api/posts/{postId}/tag-food']['post']['responses']['404']['content']['application/json']; 
import type { paths } from '../../../api';

// GET /api/posts/food/{foodCatalogueId}
export type GetFoodPostsRequest = paths['/api/posts/food/{foodCatalogueId}']['get']['parameters']['path'];
export type GetFoodPostsResponse = paths['/api/posts/food/{foodCatalogueId}']['get']['responses']['200']['content']['application/json']; 
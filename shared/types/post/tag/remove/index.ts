import type { paths } from '../../../api';

// DELETE /api/posts/{postId}/tag-food/{foodCatalogueId}
export type RemoveFoodTagRequest = paths['/api/posts/{postId}/tag-food/{foodCatalogueId}']['delete']['parameters']['path'];
export type RemoveFoodTagResponse = paths['/api/posts/{postId}/tag-food/{foodCatalogueId}']['delete']['responses']['200']['content']['application/json'];
export type RemoveFoodTagErrorResponse = paths['/api/posts/{postId}/tag-food/{foodCatalogueId}']['delete']['responses']['401']['content']['application/json'] |
                                        paths['/api/posts/{postId}/tag-food/{foodCatalogueId}']['delete']['responses']['403']['content']['application/json'] |
                                        paths['/api/posts/{postId}/tag-food/{foodCatalogueId}']['delete']['responses']['404']['content']['application/json']; 
import type { paths } from '../../../api';

// GET /api/posts/restaurant/{restaurantId}
export type GetRestaurantPostsRequest = paths['/api/posts/restaurant/{restaurantId}']['get']['parameters']['path'];
export type GetRestaurantPostsResponse = paths['/api/posts/restaurant/{restaurantId}']['get']['responses']['200']['content']['application/json']; 
// Restaurant Response Types
import type { paths } from '../../generated';

export type CreateRestaurantResponse = paths['/api/restaurants']['post']['responses']['201'];
export type GetRestaurantsResponse = paths['/api/restaurants']['get']['responses']['200'];
export type GetRestaurantByOwnerResponse = paths['/api/restaurants/owner/{userId}']['get']['responses']['200'];
export type GetOwnerRestaurantsResponse = paths['/api/restaurants/owner-restaurants/{userId}']['get']['responses']['200'];
export type SearchRestaurantsResponse = paths['/api/restaurants/search']['get']['responses']['200'];
export type GetRestaurantResponse = paths['/api/restaurants/{id}']['get']['responses']['200'];
export type UpdateRestaurantResponse = paths['/api/restaurants/{id}']['put']['responses']['200'];
export type DeleteRestaurantResponse = paths['/api/restaurants/{id}']['delete']['responses']['204']; 
// Restaurant Request Types
import type { paths } from '../../generated';

export type CreateRestaurantRequest = paths['/api/restaurants']['post']['requestBody']['content']['application/json'];
export type GetRestaurantByOwnerRequest = paths['/api/restaurants/owner/{userId}']['get']['parameters']['path'];
export type GetOwnerRestaurantsRequest = paths['/api/restaurants/owner-restaurants/{userId}']['get']['parameters']['path'];
export type SearchRestaurantsRequest = paths['/api/restaurants/search']['get']['parameters']['query'];
export type GetRestaurantRequest = paths['/api/restaurants/{id}']['get']['parameters']['path'];
export type UpdateRestaurantRequest = paths['/api/restaurants/{id}']['put']['requestBody']['content']['application/json'];
export type DeleteRestaurantRequest = paths['/api/restaurants/{id}']['delete']['parameters']['path']; 
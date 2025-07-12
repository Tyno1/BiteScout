// Restaurant Get Types - All restaurant get-related request, response, and error types
import type { paths } from '../generated';

// Get All Restaurants
export type GetRestaurantsResponse = paths['/api/restaurants']['get']['responses']['200'];

// Get Restaurant By Owner
export type GetRestaurantByOwnerRequest = paths['/api/restaurants/owner/{userId}']['get']['parameters']['path'];
export type GetRestaurantByOwnerResponse = paths['/api/restaurants/owner/{userId}']['get']['responses']['200'];

// Get Owner Restaurants
export type GetOwnerRestaurantsRequest = paths['/api/restaurants/owner-restaurants/{userId}']['get']['parameters']['path'];
export type GetOwnerRestaurantsResponse = paths['/api/restaurants/owner-restaurants/{userId}']['get']['responses']['200'];

// Get Restaurant By ID
export type GetRestaurantRequest = paths['/api/restaurants/{id}']['get']['parameters']['path'];
export type GetRestaurantResponse = paths['/api/restaurants/{id}']['get']['responses']['200']; 
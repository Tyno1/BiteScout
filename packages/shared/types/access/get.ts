// Restaurant Access Get Types - All access get-related request, response, and error types
import type { paths } from '../api';

// Get Restaurant Access By User
export type GetRestaurantAccessByUserRequest = paths['/api/restaurant-access/user/{userId}']['get']['parameters']['path'];
export type GetRestaurantAccessByUserResponse = paths['/api/restaurant-access/user/{userId}']['get']['responses']['200']['content']['application/json'];

// Get Restaurant Access By Owner
export type GetRestaurantAccessByOwnerRequest = paths['/api/restaurant-access/owner/{ownerId}']['get']['parameters']['path'];
export type GetRestaurantAccessByOwnerResponse = paths['/api/restaurant-access/owner/{ownerId}']['get']['responses']['200']['content']['application/json']; 
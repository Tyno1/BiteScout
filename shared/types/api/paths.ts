// API Path Types - Extracted from generated OpenAPI types
import type { paths } from '../generated';

// Auth Paths
export type RegisterRequest = paths['/api/auth/register']['post']['requestBody']['content']['application/json'];
export type RegisterResponse = paths['/api/auth/register']['post']['responses']['201']['content']['application/json'];
export type RegisterError400 = paths['/api/auth/register']['post']['responses']['400']['content']['application/json'];
export type RegisterError409 = paths['/api/auth/register']['post']['responses']['409']['content']['application/json'];

export type LoginRequest = paths['/api/auth/login']['post']['requestBody']['content']['application/json'];
export type LoginResponse = paths['/api/auth/login']['post']['responses']['200']['content']['application/json'];
export type LoginError400 = paths['/api/auth/login']['post']['responses']['400']['content']['application/json'];

export type RefreshTokenRequest = paths['/api/auth/refresh']['post']['requestBody']['content']['application/json'];
export type RefreshTokenResponse = paths['/api/auth/refresh']['post']['responses']['200']['content']['application/json'];
export type RefreshTokenError400 = paths['/api/auth/refresh']['post']['responses']['400']['content']['application/json'];
export type RefreshTokenError401 = paths['/api/auth/refresh']['post']['responses']['401']['content']['application/json'];

// User Paths
export type UpdateUserRequest = paths['/api/user/{userId}']['put']['requestBody']['content']['application/json'];
export type UpdateUserResponse = paths['/api/user/{userId}']['put']['responses']['200']['content']['application/json'];
export type UpdateUserError400 = paths['/api/user/{userId}']['put']['responses']['400']['content']['application/json'];
export type UpdateUserError404 = paths['/api/user/{userId}']['put']['responses']['404']['content']['application/json'];

// Restaurant Paths
export type CreateRestaurantRequest = paths['/api/restaurants']['post']['requestBody']['content']['application/json'];
export type CreateRestaurantResponse = paths['/api/restaurants']['post']['responses']['201'];

export type GetRestaurantsResponse = paths['/api/restaurants']['get']['responses']['200'];

export type GetRestaurantByOwnerRequest = paths['/api/restaurants/owner/{userId}']['get']['parameters']['path'];
export type GetRestaurantByOwnerResponse = paths['/api/restaurants/owner/{userId}']['get']['responses']['200'];

export type GetOwnerRestaurantsRequest = paths['/api/restaurants/owner-restaurants/{userId}']['get']['parameters']['path'];
export type GetOwnerRestaurantsResponse = paths['/api/restaurants/owner-restaurants/{userId}']['get']['responses']['200'];

export type SearchRestaurantsRequest = paths['/api/restaurants/search']['get']['parameters']['query'];
export type SearchRestaurantsResponse = paths['/api/restaurants/search']['get']['responses']['200'];

export type GetRestaurantRequest = paths['/api/restaurants/{id}']['get']['parameters']['path'];
export type GetRestaurantResponse = paths['/api/restaurants/{id}']['get']['responses']['200'];

export type UpdateRestaurantRequest = paths['/api/restaurants/{id}']['put']['requestBody']['content']['application/json'];
export type UpdateRestaurantResponse = paths['/api/restaurants/{id}']['put']['responses']['200'];

export type DeleteRestaurantRequest = paths['/api/restaurants/{id}']['delete']['parameters']['path'];
export type DeleteRestaurantResponse = paths['/api/restaurants/{id}']['delete']['responses']['204'];

// Food Catalogue Paths
export type CreateFoodCatalogueRequest = paths['/api/food-catalogue']['post']['requestBody']['content']['application/json'];
export type CreateFoodCatalogueResponse = paths['/api/food-catalogue']['post']['responses']['201'];

export type GetFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['parameters']['path'];
export type GetFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}']['get']['responses']['200'];

export type GetFoodCatalogueItemRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['parameters']['path'];
export type GetFoodCatalogueItemResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['get']['responses']['200'];

export type UpdateFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['put']['requestBody']['content']['application/json'];
export type UpdateFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['put']['responses']['200'];

export type DeleteFoodCatalogueRequest = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['delete']['parameters']['path'];
export type DeleteFoodCatalogueResponse = paths['/api/food-catalogue/restaurant/{restaurantId}/catalogue/{foodId}']['delete']['responses']['204'];

// Restaurant Access Paths
export type RequestRestaurantAccessRequest = paths['/api/restaurant-access/{restaurantId}']['post']['requestBody']['content']['application/json'];
export type RequestRestaurantAccessResponse = paths['/api/restaurant-access/{restaurantId}']['post']['responses']['201'];

export type GetRestaurantAccessByUserRequest = paths['/api/restaurant-access/user/{userId}']['get']['parameters']['path'];
export type GetRestaurantAccessByUserResponse = paths['/api/restaurant-access/user/{userId}']['get']['responses']['200'];

export type GetRestaurantAccessByOwnerRequest = paths['/api/restaurant-access/owner/{ownerId}']['get']['parameters']['path'];
export type GetRestaurantAccessByOwnerResponse = paths['/api/restaurant-access/owner/{ownerId}']['get']['responses']['200'];

export type GrantRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/grant']['patch']['parameters']['path'];
export type GrantRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/grant']['patch']['responses']['200'];

export type SuspendRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/suspend']['patch']['parameters']['path'];
export type SuspendRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/suspend']['patch']['responses']['200'];

export type DeleteRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/delete']['patch']['parameters']['path'];
export type DeleteRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/delete']['patch']['responses']['200'];

export type UpdateRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/update']['patch']['requestBody']['content']['application/json'];
export type UpdateRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/update']['patch']['responses']['200'];

// Notification Paths
export type GetNotificationsRequest = paths['/api/notifications/{userId}']['get']['parameters']['path'];
export type GetNotificationsResponse = paths['/api/notifications/{userId}']['get']['responses']['200'];

export type MarkNotificationReadRequest = paths['/api/notifications/{userId}/{notificationId}/read']['patch']['parameters']['path'];
export type MarkNotificationReadResponse = paths['/api/notifications/{userId}/{notificationId}/read']['patch']['responses']['200'];

export type MarkAllNotificationsReadRequest = paths['/api/notifications/{userId}/read-all']['patch']['parameters']['path'];
export type MarkAllNotificationsReadResponse = paths['/api/notifications/{userId}/read-all']['patch']['responses']['200']; 
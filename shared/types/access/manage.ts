// Restaurant Access Management Types - All access management-related request, response, and error types
import type { paths } from '../api';

// Grant Access
export type GrantRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/grant']['patch']['parameters']['path'];
export type GrantRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/grant']['patch']['responses']['200']['content']['application/json'];

// Suspend Access
export type SuspendRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/suspend']['patch']['parameters']['path'];
export type SuspendRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/suspend']['patch']['responses']['200']['content']['application/json'];

// Delete Access
export type DeleteRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/delete']['patch']['parameters']['path'];
export type DeleteRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/delete']['patch']['responses']['200']['content']['application/json'];

// Update Access
export type UpdateRestaurantAccessRequest = paths['/api/restaurant-access/access/{accessId}/update']['patch']['requestBody']['content']['application/json'];
export type UpdateRestaurantAccessResponse = paths['/api/restaurant-access/access/{accessId}/update']['patch']['responses']['200']['content']['application/json']; 
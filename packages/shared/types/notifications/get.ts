// Notifications Get Types - All notification get-related request, response, and error types
import type { paths } from '../api';

// Request
export type GetNotificationsRequest = paths['/api/notifications/{userId}']['get']['parameters']['path'];

// Response
export type GetNotificationsResponse = paths['/api/notifications/{userId}']['get']['responses']['200']['content']['application/json']; 
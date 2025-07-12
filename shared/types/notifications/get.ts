// Notifications Get Types - All notification get-related request, response, and error types
import type { paths } from '../generated';

// Get Notifications
export type GetNotificationsRequest = paths['/api/notifications/{userId}']['get']['parameters']['path'];
export type GetNotificationsResponse = paths['/api/notifications/{userId}']['get']['responses']['200']; 
// Notifications Mark Read Types - All notification mark-read-related request, response, and error types
import type { paths } from '../api';

// Mark Single Notification Read
export type MarkNotificationReadRequest = paths['/api/notifications/{userId}/{notificationId}/read']['patch']['parameters']['path'];
export type MarkNotificationReadResponse = paths['/api/notifications/{userId}/{notificationId}/read']['patch']['responses']['200']['content']['application/json'];

// Mark All Notifications Read
export type MarkAllNotificationsReadRequest = paths['/api/notifications/{userId}/read-all']['patch']['parameters']['path'];
export type MarkAllNotificationsReadResponse = paths['/api/notifications/{userId}/read-all']['patch']['responses']['200']['content']['application/json']; 
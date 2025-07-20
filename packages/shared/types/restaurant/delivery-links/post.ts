// Delivery Links POST Types - POST /api/restaurants/{id}/delivery-links request, response, and error types
import type { paths } from '../../api';

// Request
export type DeliveryLinksPostRequest = paths['/api/restaurants/{id}/delivery-links']['post']['requestBody']['content']['application/json'];

// Response
export type DeliveryLinksPostResponse = paths['/api/restaurants/{id}/delivery-links']['post']['responses']['201']['content']['application/json']; 
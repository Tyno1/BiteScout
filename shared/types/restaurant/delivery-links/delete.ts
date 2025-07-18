// Delivery Links DELETE Types - DELETE /api/restaurants/{id}/delivery-links/{linkId} request, response, and error types
import type { paths } from '../../api';

// Request
export type DeliveryLinksDeleteRequest = paths['/api/restaurants/{id}/delivery-links/{linkId}']['delete']['parameters']['path'];

// Response
export type DeliveryLinksDeleteResponse = paths['/api/restaurants/{id}/delivery-links/{linkId}']['delete']['responses']['204']; 
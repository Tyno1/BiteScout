// Delivery Links GET Types - GET /api/restaurants/{id}/delivery-links request, response, and error types
import type { paths } from '../../api';

// Request
export type DeliveryLinksGetRequest = paths['/api/restaurants/{id}/delivery-links']['get']['parameters']['path'];

// Response
export type DeliveryLinksGetResponse = paths['/api/restaurants/{id}/delivery-links']['get']['responses']['200']['content']['application/json']; 
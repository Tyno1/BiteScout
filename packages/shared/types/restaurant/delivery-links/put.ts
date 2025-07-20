// Delivery Links PUT Types - PUT /api/restaurants/{id}/delivery-links/{linkId} request, response, and error types
import type { paths } from '../../api';

// Request
export type DeliveryLinksPutRequest = paths['/api/restaurants/{id}/delivery-links/{linkId}']['put']['requestBody']['content']['application/json'];

// Response
export type DeliveryLinksPutResponse = paths['/api/restaurants/{id}/delivery-links/{linkId}']['put']['responses']['200']['content']['application/json']; 
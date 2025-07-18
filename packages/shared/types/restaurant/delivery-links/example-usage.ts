// Example usage of delivery link types in backend controller
// This file demonstrates how to properly type your delivery link endpoints

import type { DeliveryLink } from '../../api/schemas';
import type { 
  DeliveryLinksDeleteRequest,
  DeliveryLinksDeleteResponse,
  DeliveryLinksGetRequest, 
  DeliveryLinksGetResponse,
  DeliveryLinksPostRequest,
  DeliveryLinksPostResponse,
  DeliveryLinksPutRequest,
  DeliveryLinksPutResponse
} from './index';

// Example controller methods with proper typing:

/**
 * Get delivery links for a restaurant
 */
export const getDeliveryLinks = async (
  req: { params: DeliveryLinksGetRequest },
  res: { json: (data: DeliveryLinksGetResponse) => void }
) => {
  // req.params.id is typed as string
  const { id } = req.params;
  
  // Response is typed as DeliveryLink[]
  const deliveryLinks: DeliveryLinksGetResponse = [
    {
      _id: "507f1f77bcf86cd799439018",
      restaurantId: id,
      name: "Uber Eats",
      url: "https://ubereats.com/restaurant/123",
      platform: "Uber Eats",
      isActive: true,
      createdAt: "2025-04-20T15:30:00Z",
      updatedAt: "2025-04-20T15:30:00Z"
    }
  ];
  
  res.json(deliveryLinks);
};

/**
 * Add a delivery link to a restaurant
 */
export const addDeliveryLink = async (
  req: { 
    params: { id: string },
    body: DeliveryLinksPostRequest 
  },
  res: { status: (code: number) => { json: (data: DeliveryLinksPostResponse) => void } }
) => {
  // req.body is typed with required fields: name, url, platform
  const { name, url, platform, isActive = true } = req.body;
  
  // Response is typed as DeliveryLink
  const newDeliveryLink: DeliveryLinksPostResponse = {
    _id: "507f1f77bcf86cd799439018",
    restaurantId: req.params.id,
    name,
    url,
    platform,
    isActive,
    createdAt: "2025-04-20T15:30:00Z",
    updatedAt: "2025-04-20T15:30:00Z"
  };
  
  res.status(201).json(newDeliveryLink);
};

/**
 * Update a delivery link
 */
export const updateDeliveryLink = async (
  req: { 
    params: { id: string; linkId: string },
    body: DeliveryLinksPutRequest 
  },
  res: { json: (data: DeliveryLinksPutResponse) => void }
) => {
  // req.body is typed with optional fields
  const { name, url, platform, isActive } = req.body;
  
  // Response is typed as DeliveryLink
  const updatedLink: DeliveryLinksPutResponse = {
    _id: req.params.linkId,
    restaurantId: req.params.id,
    name: name || "Updated Name",
    url: url || "https://example.com",
    platform: platform || "Custom",
    isActive: isActive ?? true,
    createdAt: "2025-04-20T15:30:00Z",
    updatedAt: "2025-04-20T15:30:00Z"
  };
  
  res.json(updatedLink);
};

/**
 * Delete a delivery link
 */
export const deleteDeliveryLink = async (
  req: { params: DeliveryLinksDeleteRequest },
  res: { status: (code: number) => { send: () => void } }
) => {
  // req.params is typed with id and linkId
  const { id, linkId } = req.params;
  
  // Response is typed as void (204 No Content)
  res.status(204).send();
}; 
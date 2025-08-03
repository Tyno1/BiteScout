import apiClient from "@/utils/authClient";
import type { DeliveryLink } from "shared/types/api/schemas";
import type {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  RestaurantDetailPutRequest,
  RestaurantDetailPutResponse,
} from "shared/types/restaurant";

// Restaurant Mutations
export const createRestaurant = async (data: CreateRestaurantRequest): Promise<CreateRestaurantResponse> => {
  const response = await apiClient.post<CreateRestaurantResponse>("/restaurants", data);
  return response.data;
};

export const updateRestaurant = async (id: string, data: RestaurantDetailPutRequest): Promise<RestaurantDetailPutResponse> => {
  const response = await apiClient.put<RestaurantDetailPutResponse>(`/restaurants/${id}`, data);
  return response.data;
};

// Delivery Links Mutations
export const addDeliveryLink = async (restaurantId: string, data: Partial<DeliveryLink>): Promise<DeliveryLink> => {
  const response = await apiClient.post<DeliveryLink>(`/restaurants/${restaurantId}/delivery-links`, data);
  return response.data;
};

export const updateDeliveryLink = async (
  restaurantId: string,
  linkId: string,
  data: Partial<DeliveryLink>
): Promise<DeliveryLink> => {
  const response = await apiClient.put<DeliveryLink>(`/restaurants/${restaurantId}/delivery-links/${linkId}`, data);
  return response.data;
};

export const deleteDeliveryLink = async (restaurantId: string, linkId: string): Promise<void> => {
  await apiClient.delete(`/restaurants/${restaurantId}/delivery-links/${linkId}`);
}; 
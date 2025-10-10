import type { DeliveryLink } from "shared/types/api/schemas";
import type {
  GetRestaurantByOwnerResponse,
  RestaurantDetailGetResponse,
  SearchRestaurantsResponse,
} from "shared/types/restaurant";
import apiClient from "@/utils/authClient";

// Restaurant Queries
export const getRestaurantById = async (id: string): Promise<RestaurantDetailGetResponse> => {
  const response = await apiClient.get<RestaurantDetailGetResponse>(`/restaurants/${id}`);
  return response.data;
};

export const getRestaurantByOwnerId = async (
  ownerId: string
): Promise<GetRestaurantByOwnerResponse> => {
  const response = await apiClient.get<GetRestaurantByOwnerResponse>(
    `/restaurants/owner/${ownerId}`
  );
  return response.data;
};

export const getRestaurantsByName = async (name: string): Promise<SearchRestaurantsResponse> => {
  const response = await apiClient.get<SearchRestaurantsResponse>(`/restaurants/search/${name}`);
  return response.data;
};

// Delivery Links Queries
export const getDeliveryLinks = async (restaurantId: string): Promise<DeliveryLink[]> => {
  const response = await apiClient.get<DeliveryLink[]>(
    `/restaurants/${restaurantId}/delivery-links`
  );
  return response.data;
};

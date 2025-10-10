import type { RestaurantAccess } from "shared/types/api/schemas";
import apiClient from "@/utils/authClient";

// Restaurant Access Queries
export const getRestaurantAccessByUserId = async (
  userId: string
): Promise<{ restaurantAccesses: RestaurantAccess[] }> => {
  const response = await apiClient.get<{ restaurantAccesses: RestaurantAccess[] }>(
    `/restaurant-access/user/${userId}`
  );
  return response.data;
};

export const getRestaurantAccessByOwnerId = async (
  ownerId: string
): Promise<{ restaurantAccesses: RestaurantAccess[] }> => {
  const response = await apiClient.get<{ restaurantAccesses: RestaurantAccess[] }>(
    `/restaurant-access/owner/${ownerId}`
  );
  return response.data;
};

export const createRestaurantAccess = async (
  restaurantId: string,
  userId: string
): Promise<{ message: string; restaurantAccess: RestaurantAccess }> => {
  const response = await apiClient.post<{ message: string; restaurantAccess: RestaurantAccess }>(
    `/restaurant-access/${restaurantId}`,
    { userId }
  );
  return response.data;
};

export const grantRestaurantAccess = async (
  accessId: string
): Promise<{ message: string; accessRecord: RestaurantAccess }> => {
  const response = await apiClient.patch<{ message: string; accessRecord: RestaurantAccess }>(
    `/restaurant-access/access/${accessId}/grant`
  );
  return response.data;
};

export const deleteRestaurantAccess = async (
  accessId: string
): Promise<{ message: string; accessRecord: RestaurantAccess }> => {
  const response = await apiClient.patch<{ message: string; accessRecord: RestaurantAccess }>(
    `/restaurant-access/access/${accessId}/delete`
  );
  return response.data;
};

export const suspendRestaurantAccess = async (
  accessId: string
): Promise<{ message: string; accessRecord: RestaurantAccess }> => {
  const response = await apiClient.patch<{ message: string; accessRecord: RestaurantAccess }>(
    `/restaurant-access/access/${accessId}/suspend`
  );
  return response.data;
};

export const updateRestaurantAccessRole = async (
  accessId: string
): Promise<{ message: string; accessRecord: RestaurantAccess }> => {
  const response = await apiClient.patch<{ message: string; accessRecord: RestaurantAccess }>(
    `/restaurant-access/access/${accessId}/update`
  );
  return response.data;
};

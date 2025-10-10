import type {
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByIdResponse,
  GetUserStatsResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "shared/types/user-management";
import apiClient from "@/utils/authClient";

export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  userType?: string;
  status?: string;
  restaurantId?: string;
}): Promise<GetAllUsersResponse> => {
  const response = await apiClient.get<GetAllUsersResponse>("/user-management", {
    params,
  });
  return response.data;
};

export const getUserById = async (
  userId: string,
  restaurantId?: string
): Promise<GetUserByIdResponse> => {
  const response = await apiClient.get<GetUserByIdResponse>(`/user-management/${userId}`, {
    params: restaurantId ? { restaurantId } : {},
  });
  return response.data;
};

export const getUserStats = async (): Promise<GetUserStatsResponse> => {
  const response = await apiClient.get<GetUserStatsResponse>("/user-management/stats");
  return response.data;
};

export const updateUser = async (
  userId: string,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await apiClient.put<UpdateUserResponse>(`/user-management/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<DeleteUserResponse> => {
  const response = await apiClient.delete<DeleteUserResponse>(`/user-management/${userId}`);
  return response.data;
};

import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from "shared/types/user-profile";
import apiClient from "@/utils/authClient";

export const getUserProfile = async (userId: string): Promise<GetUserProfileResponse> => {
  const response = await apiClient.get<GetUserProfileResponse>(`/user-profile/${userId}`);
  return response.data;
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfileRequest
): Promise<UpdateUserProfileResponse> => {
  const response = await apiClient.put<UpdateUserProfileResponse>(`/user-profile/${userId}`, data);
  return response.data;
};

export const changePassword = async (
  userId: string,
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.put<ChangePasswordResponse>(
    `/user-profile/${userId}/change-password`,
    data
  );
  return response.data;
};

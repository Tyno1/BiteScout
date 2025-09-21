import apiClient from "@/utils/authClient";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from "shared/types/user-profile";

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
  const response = await apiClient.get<GetUserProfileResponse>("/user-profile");
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

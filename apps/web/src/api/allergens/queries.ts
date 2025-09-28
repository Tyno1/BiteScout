import type {
  CreateAllergenRequest,
  CreateAllergenResponse,
  DeleteAllergenResponse,
  GetAllAllergensResponse,
  GetAllergenByIdResponse,
  UpdateAllergenRequest,
  UpdateAllergenResponse,
} from "shared/types/allergens";
import apiClient from "@/utils/authClient";

// Allergen Queries
export const getAllAllergens = async (): Promise<GetAllAllergensResponse> => {
  const response = await apiClient.get<GetAllAllergensResponse>("/allergens");
  return response.data;
};

export const getAllergenById = async (id: string): Promise<GetAllergenByIdResponse> => {
  const response = await apiClient.get<GetAllergenByIdResponse>(`/allergens/${id}`);
  return response.data;
};

export const createAllergen = async (
  allergen: CreateAllergenRequest
): Promise<CreateAllergenResponse> => {
  const response = await apiClient.post<CreateAllergenResponse>("/allergens", allergen);
  return response.data;
};

export const updateAllergen = async (
  id: string,
  allergen: UpdateAllergenRequest
): Promise<UpdateAllergenResponse> => {
  const response = await apiClient.put<UpdateAllergenResponse>(`/allergens/${id}`, allergen);
  return response.data;
};

export const deleteAllergen = async (id: string): Promise<DeleteAllergenResponse> => {
  const response = await apiClient.delete<DeleteAllergenResponse>(`/allergens/${id}`);
  return response.data;
};

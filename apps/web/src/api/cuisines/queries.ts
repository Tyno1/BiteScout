import apiClient from "@/utils/authClient";
import type {
  CreateCuisineRequest,
  CreateCuisineResponse,
  DeleteCuisineResponse,
  GetAllCuisinesResponse,
  GetCuisineByIdResponse,
  UpdateCuisineRequest,
  UpdateCuisineResponse,
} from "shared/types/cuisines";

// Cuisine Queries
export const getAllCuisines = async (): Promise<GetAllCuisinesResponse> => {
  const response = await apiClient.get<GetAllCuisinesResponse>("/cuisines");
  return response.data;
};

export const getCuisineById = async (id: string): Promise<GetCuisineByIdResponse> => {
  const response = await apiClient.get<GetCuisineByIdResponse>(`/cuisines/${id}`);
  return response.data;
};

export const createCuisine = async (cuisine: CreateCuisineRequest): Promise<CreateCuisineResponse> => {
  const response = await apiClient.post<CreateCuisineResponse>("/cuisines", cuisine);
  return response.data;
};

export const updateCuisine = async (id: string, cuisine: UpdateCuisineRequest): Promise<UpdateCuisineResponse> => {
  const response = await apiClient.put<UpdateCuisineResponse>(`/cuisines/${id}`, cuisine);
  return response.data;
};

export const deleteCuisine = async (id: string): Promise<DeleteCuisineResponse> => {
  const response = await apiClient.delete<DeleteCuisineResponse>(`/cuisines/${id}`);
  return response.data;
}; 
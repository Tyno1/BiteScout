import apiClient from "@/utils/authClient";
import type { FoodCatalogue } from "shared/types/api/schemas";

// Food Catalogue Queries
export const getFoodCatalogueByRestaurant = async (
  restaurantId: string
): Promise<FoodCatalogue[]> => {
  const response = await apiClient.get<FoodCatalogue[]>(
    `/food-catalogue/restaurant/${restaurantId}`
  );
  return response.data;
};

export const getFoodCatalogueById = async (
  restaurantId: string,
  foodId: string
): Promise<FoodCatalogue> => {
  const response = await apiClient.get<FoodCatalogue>(
    `/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`
  );
  return response.data;
};

export const createFoodCatalogue = async (foodData: FoodCatalogue): Promise<FoodCatalogue> => {
  const response = await apiClient.post<FoodCatalogue>("/food-catalogue", foodData);
  return response.data;
};

export const updateFoodCatalogue = async (
  restaurantId: string,
  foodId: string,
  foodData: FoodCatalogue
): Promise<FoodCatalogue> => {
  const response = await apiClient.put<FoodCatalogue>(
    `/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`,
    foodData
  );
  return response.data;
};

export const deleteFoodCatalogue = async (restaurantId: string, foodId: string): Promise<void> => {
  await apiClient.delete(`/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`);
};

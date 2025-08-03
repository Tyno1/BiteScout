import { createFoodCatalogue, deleteFoodCatalogue, updateFoodCatalogue } from "@/api/food-catalogue/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FoodCatalogue } from "shared/types/api/schemas";

// Food Catalogue Mutations
export const useCreateFoodCatalogue = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (foodData: FoodCatalogue) => createFoodCatalogue(foodData),
    onSuccess: (data) => {
      // Invalidate and refetch food catalogue queries for the restaurant
      queryClient.invalidateQueries({ 
        queryKey: ["foodCatalogue", "restaurant", data.restaurant] 
      });
    },
  });
};

export const useUpdateFoodCatalogue = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ restaurantId, foodId, foodData }: { 
      restaurantId: string; 
      foodId: string; 
      foodData: FoodCatalogue; 
    }) => updateFoodCatalogue(restaurantId, foodId, foodData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch food catalogue queries
      queryClient.invalidateQueries({ 
        queryKey: ["foodCatalogue", "restaurant", variables.restaurantId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["foodCatalogue", "restaurant", variables.restaurantId, "food", variables.foodId] 
      });
    },
  });
};

export const useDeleteFoodCatalogue = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ restaurantId, foodId }: { restaurantId: string; foodId: string }) => 
      deleteFoodCatalogue(restaurantId, foodId),
    onSuccess: (_, variables) => {
      // Invalidate and refetch food catalogue queries
      queryClient.invalidateQueries({ 
        queryKey: ["foodCatalogue", "restaurant", variables.restaurantId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["foodCatalogue", "restaurant", variables.restaurantId, "food", variables.foodId] 
      });
    },
  });
}; 
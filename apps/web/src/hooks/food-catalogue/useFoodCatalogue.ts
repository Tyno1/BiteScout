import { getFoodCatalogueById, getFoodCatalogueByRestaurant } from "@/api/food-catalogue/queries";
import { useQuery } from "@tanstack/react-query";

// Food Catalogue Query Hooks
export const useFoodCatalogueByRestaurant = (restaurantId: string, enabled = true) => {
  return useQuery({
    queryKey: ["foodCatalogue", "restaurant", restaurantId],
    queryFn: () => getFoodCatalogueByRestaurant(restaurantId),
    enabled: enabled && !!restaurantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFoodCatalogueById = (restaurantId: string, foodId: string, enabled = true) => {
  return useQuery({
    queryKey: ["foodCatalogue", "restaurant", restaurantId, "food", foodId],
    queryFn: () => getFoodCatalogueById(restaurantId, foodId),
    enabled: enabled && !!restaurantId && !!foodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

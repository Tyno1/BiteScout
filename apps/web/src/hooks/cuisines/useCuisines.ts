import { useQuery } from "@tanstack/react-query";
import { getAllCuisines, getCuisineById } from "@/api/cuisines/queries";

// Cuisine Query Hooks
export const useCuisines = (enabled = true) => {
  return useQuery({
    queryKey: ["cuisines"],
    queryFn: getAllCuisines,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCuisineById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["cuisine", id],
    queryFn: () => getCuisineById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

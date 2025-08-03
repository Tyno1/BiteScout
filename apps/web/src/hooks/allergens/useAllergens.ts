import { getAllAllergens, getAllergenById } from "@/api/allergens/queries";
import { useQuery } from "@tanstack/react-query";

// Allergen Query Hooks
export const useAllergens = (enabled = true) => {
  return useQuery({
    queryKey: ["allergens"],
    queryFn: getAllAllergens,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAllergenById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["allergen", id],
    queryFn: () => getAllergenById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 
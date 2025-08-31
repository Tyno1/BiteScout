import { createAllergen, deleteAllergen, updateAllergen } from "@/api/allergens/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateAllergenRequest, UpdateAllergenRequest } from "shared/types/allergens";

// Allergen Mutations
export const useCreateAllergen = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (allergen: CreateAllergenRequest) => createAllergen(allergen),
    onSuccess: () => {
      // Invalidate and refetch allergens queries
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
    },
  });
};

export const useUpdateAllergen = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, allergen }: { id: string; allergen: UpdateAllergenRequest }) =>
      updateAllergen(id, allergen),
    onSuccess: (data, variables) => {
      // Invalidate and refetch allergens queries
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
      queryClient.invalidateQueries({ queryKey: ["allergen", variables.id] });
    },
  });
};

export const useDeleteAllergen = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteAllergen(id),
    onSuccess: (data, variables) => {
      // Invalidate and refetch allergens queries
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
      queryClient.invalidateQueries({ queryKey: ["allergen", variables] });
    },
  });
}; 
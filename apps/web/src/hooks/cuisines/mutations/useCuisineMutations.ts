import { createCuisine, deleteCuisine, updateCuisine } from "@/api/cuisines/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCuisineRequest, UpdateCuisineRequest } from "shared/types/cuisines";

// Cuisine Mutations
export const useCreateCuisine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cuisine: CreateCuisineRequest) => createCuisine(cuisine),
    onSuccess: () => {
      // Invalidate and refetch cuisines queries
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
    },
  });
};

export const useUpdateCuisine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cuisine }: { id: string; cuisine: UpdateCuisineRequest }) =>
      updateCuisine(id, cuisine),
    onSuccess: (_, variables) => {
      // Invalidate and refetch cuisines queries
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
      queryClient.invalidateQueries({ queryKey: ["cuisine", variables.id] });
    },
  });
};

export const useDeleteCuisine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCuisine(id),
    onSuccess: (_, variables) => {
      // Invalidate and refetch cuisines queries
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
      queryClient.invalidateQueries({ queryKey: ["cuisine", variables] });
    },
  });
};

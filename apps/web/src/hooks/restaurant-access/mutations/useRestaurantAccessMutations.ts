import {
  createRestaurantAccess,
  deleteRestaurantAccess,
  grantRestaurantAccess,
  suspendRestaurantAccess,
  updateRestaurantAccessRole,
} from "@/api/restaurant-access/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Restaurant Access Mutations
export const useCreateRestaurantAccess = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ restaurantId, userId }: { restaurantId: string; userId: string }) =>
      createRestaurantAccess(restaurantId, userId),
    onSuccess: (_, variables) => {
      // Invalidate and refetch restaurant access queries
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess", "user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess", "owner"] });
    },
  });
};

export const useGrantRestaurantAccess = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accessId: string) => grantRestaurantAccess(accessId),
    onSuccess: () => {
      // Invalidate all restaurant access queries
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess"] });
    },
  });
};

export const useDeleteRestaurantAccess = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accessId: string) => deleteRestaurantAccess(accessId),
    onSuccess: () => {
      // Invalidate all restaurant access queries
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess"] });
    },
  });
};

export const useSuspendRestaurantAccess = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accessId: string) => suspendRestaurantAccess(accessId),
    onSuccess: () => {
      // Invalidate all restaurant access queries
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess"] });
    },
  });
};

export const useUpdateRestaurantAccessRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accessId: string) => updateRestaurantAccessRole(accessId),
    onSuccess: () => {
      // Invalidate all restaurant access queries
      queryClient.invalidateQueries({ queryKey: ["restaurantAccess"] });
    },
  });
}; 
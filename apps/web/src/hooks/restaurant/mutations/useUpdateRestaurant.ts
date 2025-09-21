import { updateRestaurant } from "@/api/restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RestaurantDetailPutRequest } from "shared/types/restaurant";

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RestaurantDetailPutRequest }) =>
      updateRestaurant(id, data),
    onSuccess: (data, variables) => {
      // Update the specific restaurant in cache
      queryClient.setQueryData(["restaurant", variables.id], data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

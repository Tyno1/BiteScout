import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "@/api/restaurant";

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
};

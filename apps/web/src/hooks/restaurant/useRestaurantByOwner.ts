import { getRestaurantByOwnerId } from "@/api/restaurant";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ["restaurant", "owner", ownerId],
    queryFn: () => getRestaurantByOwnerId(ownerId),
    enabled: !!ownerId,
  });
};

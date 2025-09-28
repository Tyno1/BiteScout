import { useQuery } from "@tanstack/react-query";
import { getRestaurantByOwnerId } from "@/api/restaurant";

export const useRestaurantByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ["restaurant", "owner", ownerId],
    queryFn: () => getRestaurantByOwnerId(ownerId),
    enabled: !!ownerId,
  });
};

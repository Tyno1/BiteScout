import { getRestaurantsByName } from "@/api/restaurant";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantsByName = (name: string) => {
  return useQuery({
    queryKey: ["restaurants", "search", name],
    queryFn: () => getRestaurantsByName(name),
    enabled: !!name && name.length > 0,
  });
};

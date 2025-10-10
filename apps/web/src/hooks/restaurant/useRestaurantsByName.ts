import { useQuery } from "@tanstack/react-query";
import { getRestaurantsByName } from "@/api/restaurant";

export const useRestaurantsByName = (name: string) => {
  return useQuery({
    queryKey: ["restaurants", "search", name],
    queryFn: () => getRestaurantsByName(name),
    enabled: !!name && name.length > 0,
  });
};

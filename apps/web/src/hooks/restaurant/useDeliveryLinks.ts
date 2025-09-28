import { useQuery } from "@tanstack/react-query";
import { getDeliveryLinks } from "@/api/restaurant";

export const useDeliveryLinks = (restaurantId: string, enabled = true) => {
  return useQuery({
    queryKey: ["delivery-links", restaurantId],
    queryFn: () => getDeliveryLinks(restaurantId),
    enabled: enabled && !!restaurantId,
  });
};

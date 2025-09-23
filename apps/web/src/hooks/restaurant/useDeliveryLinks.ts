import { getDeliveryLinks } from "@/api/restaurant";
import { useQuery } from "@tanstack/react-query";

export const useDeliveryLinks = (restaurantId: string, enabled = true) => {
  return useQuery({
    queryKey: ["delivery-links", restaurantId],
    queryFn: () => getDeliveryLinks(restaurantId),
    enabled: enabled && !!restaurantId,
  });
};

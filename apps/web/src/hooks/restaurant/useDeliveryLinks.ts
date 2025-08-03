import { getDeliveryLinks } from '@/api/restaurant';
import { useQuery } from '@tanstack/react-query';

export const useDeliveryLinks = (restaurantId: string) => {
  return useQuery({
    queryKey: ['delivery-links', restaurantId],
    queryFn: () => getDeliveryLinks(restaurantId),
    enabled: !!restaurantId,
  });
}; 
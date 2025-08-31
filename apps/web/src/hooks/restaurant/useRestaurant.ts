import { getRestaurantById } from '@/api/restaurant';
import { useQuery } from '@tanstack/react-query';

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
}; 
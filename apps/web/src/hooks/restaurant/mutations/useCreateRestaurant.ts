import { createRestaurant } from '@/api/restaurant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateRestaurantRequest } from 'shared/types/restaurant';

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRestaurantRequest) => createRestaurant(data),
    onSuccess: () => {
      // Invalidate and refetch restaurant queries
      queryClient.invalidateQueries({ queryKey: ['restaurant'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
}; 
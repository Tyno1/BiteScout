import { addDeliveryLink, deleteDeliveryLink, updateDeliveryLink } from '@/api/restaurant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeliveryLink } from 'shared/types/api/schemas';

export const useAddDeliveryLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ restaurantId, data }: { restaurantId: string; data: Partial<DeliveryLink> }) =>
      addDeliveryLink(restaurantId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-links', variables.restaurantId] });
    },
  });
};

export const useUpdateDeliveryLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      restaurantId, 
      linkId, 
      data 
    }: { 
      restaurantId: string; 
      linkId: string; 
      data: Partial<DeliveryLink> 
    }) => updateDeliveryLink(restaurantId, linkId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-links', variables.restaurantId] });
    },
  });
};

export const useDeleteDeliveryLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ restaurantId, linkId }: { restaurantId: string; linkId: string }) =>
      deleteDeliveryLink(restaurantId, linkId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-links', variables.restaurantId] });
    },
  });
}; 
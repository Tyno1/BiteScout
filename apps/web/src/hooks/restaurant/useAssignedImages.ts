import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { RestaurantAssignedImagesPutRequest } from "shared/types/restaurant/detail";
import { updateAssignedImages } from "@/api/restaurant/mutations";

export const useAssignedImages = (restaurantId: string) => {
  const queryClient = useQueryClient();

  const updateAssignedImagesMutation = useMutation({
    mutationFn: (data: RestaurantAssignedImagesPutRequest) =>
      updateAssignedImages(restaurantId, data),
    onSuccess: () => {
      // Invalidate and refetch restaurant data for all user types
      queryClient.invalidateQueries({
        queryKey: ["restaurant", restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "owner"],
      });
      // Also invalidate search and filter queries that contain gallery data
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "filter"],
      });
      toast.success("Assigned images updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update assigned images:", error);
      toast.error("Failed to update assigned images");
    },
  });

  const updateLogo = (mediaId: string | null) => {
    return updateAssignedImagesMutation.mutate({ logo: mediaId });
  };

  const updateProfileImage = (mediaId: string | null) => {
    return updateAssignedImagesMutation.mutate({ profileImage: mediaId });
  };

  return {
    updateLogo,
    updateProfileImage,
    isLoading: updateAssignedImagesMutation.isPending,
    error: updateAssignedImagesMutation.error,
  };
};

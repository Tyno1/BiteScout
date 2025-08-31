import { updateUserProfile } from "@/api/user-profile/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserProfileRequest } from "shared/types";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserProfileRequest;
    }) => updateUserProfile(userId, data),
    onSuccess: (_, variables) => {
      // Invalidate user profile queries
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({
        queryKey: ["user-profile", variables.userId],
      });
      // Also invalidate user management queries in case they're used elsewhere
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
      queryClient.invalidateQueries({
        queryKey: ["user-management", variables.userId],
      });
    },
  });
};

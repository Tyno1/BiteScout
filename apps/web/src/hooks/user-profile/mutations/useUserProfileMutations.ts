import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { UpdateUserProfileRequest } from "shared/types";
import { updateUserProfile } from "@/api/user-profile/queries";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserProfileRequest }) =>
      updateUserProfile(userId, data),
    onSuccess: async (response, variables) => {
      // Update the NextAuth session with the new user data
      if (session?.user?._id === variables.userId) {
        console.log("Updating session with response:", response);
        console.log("Current session user:", session.user);
        
        await update({
          user: {
            ...session.user,
            ...response.user,
          },
        });
        
        console.log("Session update completed");
      }

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

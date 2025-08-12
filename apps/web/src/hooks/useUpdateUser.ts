import apiClient from "@/utils/authClient";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const { data: session, update } = useSession();

  const updateUser = async (id: string) => {
    if (!id) {
      setError("User ID is required");
      return;
    }

    if (!session) {
      setError("User session is not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.put(`/users/${id}`);

      if (!response.data) {
        setError("No data returned from the server");
        return;
      }
      const data = response.data;

      console.log("Updating session with:", data);

      // Update the client-side session with new data
      await update({
        user: {
          ...session.user,
          restaurantCount: data.restaurantCount,
          userType: data.userType,
        },
      });

      console.log("Session updated successfully");

      // Force a session refresh to ensure the updated data is available
      await getSession();
      console.log("Session refreshed");
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating user:", err);
      setError(error.message || "Failed to update user");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
} 
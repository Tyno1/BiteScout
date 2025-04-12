import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const { data: session, update } = useSession();

  const updateUser = async (id: string) => {
    if (!id) {
      setError("User ID is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${BACKEND_API}/users/${id}`);
      const data = response.data;

      // 2. Update the client-side session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          restaurantCount: data.restaurantCount,
          userType: data.userType,
        },
      });
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "Failed to update user");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
}

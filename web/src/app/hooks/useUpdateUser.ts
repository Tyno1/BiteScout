// hooks/useUpdateUser.js
import { useState } from "react";
import axios from "axios";
import { User } from "next-auth";

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<User | null>(null);

  const updateUser = async (id: string) => {
    if (!id) {
      setError("User ID is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("i ran in react");
      
      const response = await axios.put(`${BACKEND_API}/users/${id}`);
      setData(response.data);
      return response.data;
      console.log("using");
      
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "Failed to update user");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error, data };
}

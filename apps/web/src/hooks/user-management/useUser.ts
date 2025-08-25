import {
  getAllUsers,
  getUserById,
  getUserStats,
} from "@/api/user-management/queries";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    userType?: string;
    status?: string;
    restaurantId?: string;
  },
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) => {
  return useQuery({
    queryKey: ["user-management", params],
    queryFn: () => getAllUsers(params),
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    gcTime: options?.gcTime ?? 1000 * 60 * 10, // 10 minutes
    enabled: options?.enabled ?? true,
  });
};

export const useUserById = (userId: string, restaurantId?: string) => {
  return useQuery({
    queryKey: ["user-management", userId, restaurantId],
    queryFn: () => getUserById(userId, restaurantId),
    enabled: !!userId && !!restaurantId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ["user-management", "stats"],
    queryFn: getUserStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};


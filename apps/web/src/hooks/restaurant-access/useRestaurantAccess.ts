import {
	getRestaurantAccessByOwnerId,
	getRestaurantAccessByUserId,
} from "@/api/restaurant-access/queries";
import { useQuery } from "@tanstack/react-query";

// Restaurant Access Query Hooks
export const useRestaurantAccessByUserId = (userId: string, enabled = true) => {
	return useQuery({
		queryKey: ["restaurantAccess", "user", userId],
		queryFn: () => getRestaurantAccessByUserId(userId),
		enabled: enabled && !!userId,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useRestaurantAccessByOwnerId = (
	ownerId: string,
	enabled = true,
) => {
	return useQuery({
		queryKey: ["restaurantAccess", "owner", ownerId],
		queryFn: () => getRestaurantAccessByOwnerId(ownerId),
		enabled: enabled && !!ownerId,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

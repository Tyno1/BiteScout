import serverApiClient from "@/utils/serverApiClient";
import type { AccessRoles, RestaurantAccess } from "shared/types";

export async function checkRestaurantAccessAction(
  userId: string,
  restaurantId: string,
  userType: AccessRoles
): Promise<{ hasAccess: boolean; error?: string }> {
  try {
    // Admin and root users have access to all restaurants
    if (userType === "admin" || userType === "root") {
      return { hasAccess: true };
    }

    // For other user types, check if they have approved access to this specific restaurant
    const response = await serverApiClient.get(`/restaurant-access/user/${userId}`);

    const result = response.data;
    const restaurantAccesses = result.restaurantAccesses || [];

    // Filter for approved access to this specific restaurant
    const approvedAccess = restaurantAccesses.filter(
      (access: RestaurantAccess) =>
        access.status === "approved" && access.restaurantId === restaurantId
    );

    return { hasAccess: approvedAccess.length > 0 };
  } catch (error) {
    console.error("Error checking restaurant access:", error);
    return { hasAccess: false, error: "Error checking restaurant access" };
  }
}

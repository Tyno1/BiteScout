import useCuisineStore from "@/stores/cuisineStore";
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { useCallback, useMemo } from "react";
import { useRole } from "./useRole";

export const useRestaurantAccess = () => {
  const { session, isLoading: roleLoading } = useRole();
  const { 
    restaurantData, 
    isLoading: restaurantLoading,
    updateRestaurant,
    getRestaurantById,
    getRestaurantByOwnerId,
    getDeliveryLinks,
    addDeliveryLink,
    deleteDeliveryLink,
    isLoading: deliveryLinksLoading,
  } = useRestaurantStore();
  
  const { 
    restaurantAccessList,
    getRestaurantListAccess: originalGetRestaurantListAccess,
    isLoading: accessLoading,
  } = useRestaurantAccessStore();

  // Memoize the getRestaurantListAccess function to prevent infinite loops
  const getRestaurantListAccess = useCallback(async (userId: string) => {
    return originalGetRestaurantListAccess(userId);
  }, [originalGetRestaurantListAccess]);
  
  const { cuisines, getCuisines } = useCuisineStore();

  // More precise loading state logic
  const isLoading = useMemo(() => {
    // If we're loading role data, show loading
    if (roleLoading) return true;
    
    // If we have restaurant data, we're not loading
    if (restaurantData?._id) return false;
    
    // If we're loading restaurant data, show loading
    if (restaurantLoading) return true;
    
    // If we're loading access data and user is not an owner, show loading
    if (accessLoading && !session?.user?.restaurantCount) return true;
    
    return false;
  }, [roleLoading, restaurantLoading, accessLoading, restaurantData?._id, session?.user?.restaurantCount]);

  // Helper function to get the first approved restaurant access
  const getFirstApprovedRestaurantId = useCallback(() => {
    const approvedAccess = restaurantAccessList.find(
      (access) => access.status === "approved"
    );
    return approvedAccess?.restaurantId;
  }, [restaurantAccessList]);

  // Helper function to determine if user is an owner
  const isOwner = useCallback(() => {
    return session?.user?.restaurantCount && session.user.restaurantCount > 0;
  }, [session?.user?.restaurantCount]);

  // Helper function to load appropriate restaurant data
  const loadRestaurantData = useCallback(async () => {
    if (!session?.user?._id) return;

    try {
      if (isOwner()) {
        // User is an owner, fetch by owner ID
        await getRestaurantByOwnerId(session.user._id);
      } else {
        // User is not an owner, check for approved restaurant access
        const approvedRestaurantId = getFirstApprovedRestaurantId();
        if (approvedRestaurantId) {
          await getRestaurantById(approvedRestaurantId);
        }
      }
    } catch (error) {
      console.error("Failed to load restaurant data:", error);
    }
  }, [session?.user?._id, isOwner, getRestaurantByOwnerId, getFirstApprovedRestaurantId, getRestaurantById]);

  // Helper function to load restaurant data by specific ID
  const loadRestaurantDataById = useCallback(async (restaurantId: string) => {
    if (!restaurantId) return;

    try {
      await getRestaurantById(restaurantId);
    } catch (error) {
      console.error("Failed to load restaurant data by ID:", error);
    }
  }, [getRestaurantById]);

  return {
    // Data
    restaurantData,
    session,
    cuisines,
    restaurantAccessList,
    
    // Loading states
    isLoading,
    roleLoading,
    restaurantLoading,
    deliveryLinksLoading,
    accessLoading,
    
    // Helper functions
    isOwner: isOwner(),
    getFirstApprovedRestaurantId,
    loadRestaurantData,
    loadRestaurantDataById,
    
    // Actions
    updateRestaurant,
    getRestaurantById,
    getRestaurantByOwnerId,
    getRestaurantListAccess,
    getDeliveryLinks,
    addDeliveryLink,
    deleteDeliveryLink,
    getCuisines,
  };
}; 
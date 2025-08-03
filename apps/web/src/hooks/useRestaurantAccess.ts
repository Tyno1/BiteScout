import { useCuisines } from "@/hooks/cuisines";
import {
  useAddDeliveryLink,
  useCreateRestaurant,
  useDeleteDeliveryLink,
  useDeliveryLinks,
  useRestaurant,
  useRestaurantByOwner,
  useUpdateRestaurant,
} from "@/hooks/restaurant";
import {
  useCreateRestaurantAccess,
  useDeleteRestaurantAccess,
  useGrantRestaurantAccess,
  useRestaurantAccessByOwnerId,
  useRestaurantAccessByUserId,
  useSuspendRestaurantAccess,
  useUpdateRestaurantAccessRole,
} from "@/hooks/restaurant-access";
import { useRole } from "@/hooks/useRole";
import { useCallback, useMemo } from "react";
import type { RestaurantAccess } from "shared/types/api/schemas";

export const useRestaurantAccess = () => {
  const { session, isLoading: roleLoading } = useRole();
  
  // Helper function to determine if user is an owner
  const isOwner = useCallback(() => {
    return Boolean(session?.user?.restaurantCount && session.user.restaurantCount > 0);
  }, [session?.user?.restaurantCount]);



  // Restaurant mutations
  const updateRestaurantMutation = useUpdateRestaurant();
  const createRestaurantMutation = useCreateRestaurant();
  const addDeliveryLinkMutation = useAddDeliveryLink();
  const deleteDeliveryLinkMutation = useDeleteDeliveryLink();

  // Restaurant access queries
  const {
    data: userAccessData,
    isLoading: userAccessLoading,
    error: userAccessError,
    refetch: refetchUserAccess,
  } = useRestaurantAccessByUserId(
    session?.user?._id || "",
    !isOwner() && Boolean(session?.user?._id)
  );

  const {
    data: ownerAccessData,
    isLoading: ownerAccessLoading,
    error: ownerAccessError,
    refetch: refetchOwnerAccess,
  } = useRestaurantAccessByOwnerId(
    session?.user?._id || "",
    isOwner() && Boolean(session?.user?._id)
  );

  // Restaurant access mutations
  const createAccessMutation = useCreateRestaurantAccess();
  const grantAccessMutation = useGrantRestaurantAccess();
  const deleteAccessMutation = useDeleteRestaurantAccess();
  const suspendAccessMutation = useSuspendRestaurantAccess();
  const updateRoleMutation = useUpdateRestaurantAccessRole();

  // Helper function to get restaurant list access (for backward compatibility)
  const getRestaurantListAccess = useCallback(async (userId: string) => {
    if (isOwner()) {
      return refetchOwnerAccess();
    }
    return refetchUserAccess();
  }, [isOwner, refetchOwnerAccess, refetchUserAccess]);

  // Get the appropriate access data based on user role
  const restaurantAccessList = useMemo(() => {
    if (isOwner()) {
      return ownerAccessData?.restaurantAccesses || [];
    }
    return userAccessData?.restaurantAccesses || [];
  }, [isOwner, ownerAccessData, userAccessData]);

  // Get the first approved restaurant access for non-owners
  const approvedRestaurantId = useMemo(() => {
    if (isOwner()) return null;
    const approvedAccess = restaurantAccessList.find(
      (access: RestaurantAccess) => access.status === "approved"
    );
    return approvedAccess?.restaurantId;
  }, [isOwner, restaurantAccessList]);

  const accessLoading = userAccessLoading || ownerAccessLoading;
  const accessError = userAccessError || ownerAccessError;

  // Restaurant queries - fetch by owner ID for owners
  const {
    data: ownerRestaurantData,
    isLoading: ownerRestaurantLoading,
    refetch: refetchOwnerRestaurant,
  } = useRestaurantByOwner(session?.user?._id || "");

  // Restaurant query - fetch by restaurant ID for non-owners with approved access
  const {
    data: approvedRestaurantData,
    isLoading: approvedRestaurantLoading,
    refetch: refetchApprovedRestaurant,
  } = useRestaurant(approvedRestaurantId || "");

  // Combine restaurant data based on user role
  const restaurantData = isOwner() ? ownerRestaurantData : approvedRestaurantData;
  const restaurantLoading = isOwner() ? ownerRestaurantLoading : approvedRestaurantLoading;
  const refetchRestaurant = isOwner() ? refetchOwnerRestaurant : refetchApprovedRestaurant;

  // Delivery links query
  const {
    data: deliveryLinksData,
    isLoading: deliveryLinksLoading,
    refetch: refetchDeliveryLinks,
  } = useDeliveryLinks(restaurantData?._id || "");
  
  const { data: cuisines, refetch: getCuisines } = useCuisines();

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
      (access: RestaurantAccess) => access.status === "approved"
    );
    return approvedAccess?.restaurantId;
  }, [restaurantAccessList]);

  // Helper function to load appropriate restaurant data
  const loadRestaurantData = useCallback(async () => {
    if (!session?.user?._id) return;

    try {
      if (isOwner()) {
        // User is an owner, refetch restaurant data
        await refetchRestaurant();
      } else {
        // User is not an owner, check for approved restaurant access
        const approvedRestaurantId = getFirstApprovedRestaurantId();
        if (approvedRestaurantId) {
          // For non-owners, refetch the approved restaurant data
          await refetchApprovedRestaurant();
        }
      }
    } catch (error) {
      console.error("Failed to load restaurant data:", error);
    }
  }, [session?.user?._id, isOwner, refetchRestaurant, refetchApprovedRestaurant, getFirstApprovedRestaurantId]);

  // Helper function to load restaurant data by specific ID
  const loadRestaurantDataById = useCallback(async (restaurantId: string) => {
    if (!restaurantId) return;

    try {
      // This would need a different query hook for specific restaurant by ID
      // For now, we'll use the existing refetch
      await refetchRestaurant();
    } catch (error) {
      console.error("Failed to load restaurant data by ID:", error);
    }
  }, [refetchRestaurant]);

  // Helper function to get restaurant access by status
  const getRestaurantAccessByStatus = useCallback((status: string) => {
    return restaurantAccessList.filter((access: RestaurantAccess) => access.status === status);
  }, [restaurantAccessList]);

  // Helper function to check if user has access to a specific restaurant
  const hasAccessToRestaurant = useCallback((restaurantId: string) => {
    return restaurantAccessList.some(
      (access: RestaurantAccess) => access.restaurantId === restaurantId && access.status === "approved"
    );
  }, [restaurantAccessList]);

  // Helper function to get pending access requests
  const getPendingAccessRequests = useCallback(() => {
    return getRestaurantAccessByStatus("pending");
  }, [getRestaurantAccessByStatus]);

  // Helper function to get approved access
  const getApprovedAccess = useCallback(() => {
    return getRestaurantAccessByStatus("approved");
  }, [getRestaurantAccessByStatus]);

  return {
    // Data
    restaurantData,
    session,
    cuisines,
    restaurantAccessList,
    deliveryLinks: deliveryLinksData || [],
    accessError,
    
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
    getRestaurantAccessByStatus,
    hasAccessToRestaurant,
    getPendingAccessRequests,
    getApprovedAccess,
    
    // Restaurant Actions
    updateRestaurant: updateRestaurantMutation.mutate,
    createRestaurant: createRestaurantMutation.mutate,
    addDeliveryLink: addDeliveryLinkMutation.mutate,
    deleteDeliveryLink: deleteDeliveryLinkMutation.mutate,
    getDeliveryLinks: refetchDeliveryLinks,
    getCuisines,
    
    // Restaurant Access Actions
    getRestaurantListAccess,
    createRestaurantAccess: createAccessMutation.mutate,
    grantAccess: grantAccessMutation.mutate,
    deleteAccess: deleteAccessMutation.mutate,
    suspendAccess: suspendAccessMutation.mutate,
    updateAccessRole: updateRoleMutation.mutate,
    refetchUserAccess,
    refetchOwnerAccess,
  };
}; 
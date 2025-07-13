import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import getApprovedAccessList from "@/utils/getApprovedAccessList";
import { useEffect, useMemo, useState } from "react";
import { useRole } from "./useRole";

export function useApprovedAccess() {
  const { restaurantAccessList, getRestaurantListAccess, isLoading } =
    useRestaurantAccessStore();
  const { session } = useRole();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const accessApproved = useMemo(() => {
    return getApprovedAccessList(restaurantAccessList);
  }, [restaurantAccessList]);

  useEffect(() => {
    const firstRestaurantId = accessApproved[0]?.restaurantId as string;
    const hasAccessToRestaurants = accessApproved.length > 0;

    setRestaurantId(firstRestaurantId || null);
    setHasAccess(hasAccessToRestaurants);
  }, [accessApproved]);

  useEffect(() => {
    if (session?.user?._id) {
      getRestaurantListAccess(session?.user?._id);
    }
  }, [session?.user?._id, getRestaurantListAccess]);

  return { isLoading, restaurantId, hasAccess };
}

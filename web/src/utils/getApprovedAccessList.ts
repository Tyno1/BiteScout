import { RestaurantAccess } from "@/types";

const getApprovedAccessList = (restaurantAccessList: RestaurantAccess[]) => {
  return restaurantAccessList.filter((access) => access.status === "approved");
};
/**
 * Filters the restaurant access list to include only entries with an "approved" status.
 * 
 * @param {RestaurantAccess[]} restaurantAccessList - The list of restaurant access objects.
 * @returns {RestaurantAccess[]} - A filtered list containing only approved access entries.
 */
export default getApprovedAccessList;

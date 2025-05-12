import { RestaurantAccess } from "@/types/restaurantAccess";
import apiClient from "@/utils/authClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RestaurantAccessState = {
  // state
  restaurantAccess: RestaurantAccess;
  restaurantAccessList: RestaurantAccess[];
  error: string | null;
  isLoading: boolean;
  // actions
  createRestaurantAccess: ({
    userId,
    restaurantId,
  }: {
    userId: string;
    restaurantId: string;
  }) => Promise<{ success: boolean; error?: string }>;

  getRestaurantAccess: (
    userId: string
  ) => Promise<{ success: boolean; error?: string } | null>;

  resetAccess: () => void;
};
const DEFAULT_RESTAURANT_ACCESS: RestaurantAccess = {
  _id: "",
  userId: "",
  restaurantId: "",
  role: "",
  status: "pending",
};

const useRestaurantAccessStore = create<RestaurantAccessState>()(
  persist(
    (set, get) => ({
      restaurantAccess: DEFAULT_RESTAURANT_ACCESS,
      restaurantAccessList: [],
      isLoading: false,
      error: null,

      createRestaurantAccess: async ({
        userId,
        restaurantId,
      }: {
        userId: string;
        restaurantId: string;
      }) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post(
            `/restaurant-access/${restaurantId}`,
            { userId }
          );
          if (response.data) {
            set({
              restaurantAccessList: [
                ...get().restaurantAccessList,
                response.data.restaurantAccess,
              ],
              restaurantAccess: response.data,
            });
          }
          return {
            success: true,
            restaurantAccess: response.data,
          };
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Error creating restaurant access",
          });
          return {
            success: false,
            error:
              error instanceof Error ? error?.message : "An error occurred",
          };
        } finally {
          set({ isLoading: false });
        }
      },

      getRestaurantAccess: async (userId: string) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.get(
            `/restaurant-access/user/${userId}`
          );
          if (response.data) {
            set({ restaurantAccessList: response.data.restaurantAccesses });
          }
          return {
            success: true,
            restaurantAccessList: response.data.restaurantAccesses,
          };
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Error fetching restaurant access",
          });
          return {
            success: false,
            error:
              error instanceof Error ? error?.message : "An error occurred",
          };
        } finally {
          set({ isLoading: false });
        }
      },

      resetAccess: () =>
        set({
          restaurantAccess: DEFAULT_RESTAURANT_ACCESS,
          restaurantAccessList: [],
          error: null,
          isLoading: false,
        }),
    }),
    {
      name: "restaurantAccess",
      onRehydrateStorage: () => (state) => {
        console.log("✅ restaurantAccessStore has been rehydrated", state);
      },
    }
  )
);

export default useRestaurantAccessStore;

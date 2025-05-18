import { RestaurantData } from "@/types/restaurantData";
import apiClient from "@/utils/authClient";
import { create } from "zustand";

type RestaurantStore = {
  // state
  restaurantData: RestaurantData;
  restaurantDatas: RestaurantData[];
  isLoading: boolean;
  error: string | null;

  // actions
  createRestaurant: (
    data: RestaurantData
  ) => Promise<{ success: boolean; error?: string }>;
  getRestaurantById: (id: string) => Promise<void>;
  getRestaurantByOwnerId: (ownerId: string) => Promise<void>;
  getRestaurantsByName: (
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateRestaurant: ({
    data,
    id,
  }: {
    data: RestaurantData;
    id: string;
  }) => Promise<{ success: boolean; error?: string }>;
  resetRestaurant: () => void;
};

const DEFAULT_RESTAURANT_DATA: RestaurantData = {
  _id: "",
  name: "",
  logo: "",
  description: "",
  cuisine: [],
  priceRange: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  businessHours: [
    {
      day: "",
      open: "",
      close: "",
      closed: false,
    },
  ],
  features: [],
  gallery: [],
  meta: {},
  owner: false,
  ownerId: "",
};

const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurantData: DEFAULT_RESTAURANT_DATA,
  restaurantDatas: [DEFAULT_RESTAURANT_DATA],
  isLoading: false,
  error: null,

  createRestaurant: async (data: RestaurantData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.post("/restaurants", data);

      set({
        restaurantData: response.data,
      });
      return { success: true };
    } catch (error) {
      set({
        error: error instanceof Error ? error?.message : "An error occurred",
      });
      return {
        success: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getRestaurantsByName: async (name: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await apiClient.get(
        `/restaurants/search?name=${name}`
      );

      if (response.data.length === 0) {
        set({ restaurantData: DEFAULT_RESTAURANT_DATA });
      }

      console.log(response.data);

      set({
        restaurantDatas: response.data,
      });
      return { success: true };
    } catch (error) {
      set({
        error: error instanceof Error ? error?.message : "An error occurred",
      });
      return {
        success: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getRestaurantById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await apiClient.get(`/restaurants/${id}`);

      set({
        restaurantData: response.data,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error?.message : "An error occurred",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getRestaurantByOwnerId: async (ownerId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await apiClient.get(`/restaurants/owner/${ownerId}`);

      if (response.data.length === 0) {
        set({ restaurantData: DEFAULT_RESTAURANT_DATA });
      }

      set({
        restaurantData: response.data,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error?.message : "An error occurred",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateRestaurant: async ({
    data,
    id,
  }: {
    data: RestaurantData;
    id: string;
  }) => {
    try {
      set({ isLoading: true, error: null });
      console.log(id, data);

      const response = await apiClient.put(`/restaurants/${id}`, {
        data,
      });

      set({
        restaurantData: response.data,
      });

      return { success: true };
    } catch (error) {
      set({
        error: error instanceof Error ? error?.message : "An error occurred",
      });
      return {
        success: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  resetRestaurant: () =>
    set({ restaurantData: DEFAULT_RESTAURANT_DATA, error: null }),
}));

export default useRestaurantStore;

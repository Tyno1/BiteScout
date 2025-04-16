import { RestaurantData } from "@/types/restaurantData";
import axios from "axios";
import { create } from "zustand";

type RestaurantStore = {
  // state
  restaurantData: RestaurantData;
  isLoading: boolean;
  error: string | null;

  // actions
  createRestaurant: (
    data: RestaurantData
  ) => Promise<{ success: boolean; error?: string }>;
  getRestaurant: (id: string) => Promise<void>;
  getRestaurantByOwnerId: (ownerId: string) => Promise<void>;
  updateRestaurant: ({
    data,
    id,
  }: {
    data: RestaurantData;
    id: string;
  }) => Promise<void>;
  resetRestaurant: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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
  isLoading: false,
  error: null,

  createRestaurant: async (data: RestaurantData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.post(`${API_URL}/restaurants`, data, {
        withCredentials: true,
      });

      set({
        restaurantData: response.data,
      });
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      });
      return {
        success: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      };
    }
  },

  getRestaurant: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${API_URL}/restaurants?id=${id}`);

      set({
        restaurantData: response.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      });
    }
  },

  getRestaurantByOwnerId: async (ownerId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(
        `${API_URL}/restaurants/owner/${ownerId}`, {
          withCredentials: true,
        }
      );

      // remember to handle the case when no restaurant is found
      if (response.data.length === 0) {
        set({ restaurantData: DEFAULT_RESTAURANT_DATA });
      }

      set({
        restaurantData: response.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      });
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
      const response = await axios.put(`${API_URL}/restaurants/?id=${id}`, {
        data,
      });

      set({
        restaurantData: response.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error?.message : "An error occurred",
      });
    }
  },

  resetRestaurant: () =>
    set({ restaurantData: DEFAULT_RESTAURANT_DATA, error: null }),
}));

export default useRestaurantStore;

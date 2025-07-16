import { handleApiError } from "@/utils/apiErrorHandler";
import apiClient from "@/utils/authClient";
import type { BusinessHour, DeliveryLink, Restaurant } from "@shared/types/api/schemas";
import type { ApiError } from "@shared/types/common/errors.js";
import type {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  RestaurantDetailGetResponse,
  RestaurantDetailPutRequest,
  RestaurantDetailPutResponse,
} from "@shared/types/restaurant";

import type { GetRestaurantByOwnerResponse } from "@shared/types/restaurant/get";
import type { SearchRestaurantsResponse } from "@shared/types/restaurant/search";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RestaurantStore = {
  // state
  restaurantData: Restaurant;
  restaurantDatas: Restaurant[];
  isLoading: boolean;
  error: string | null;

  // actions
  createRestaurant: (
    data: CreateRestaurantRequest
  ) => Promise<CreateRestaurantResponse>;
  getRestaurantById: (id: string) => Promise<RestaurantDetailGetResponse>;
  getRestaurantByOwnerId: (
    ownerId: string
  ) => Promise<GetRestaurantByOwnerResponse>;
  getRestaurantsByName: (name: string) => Promise<SearchRestaurantsResponse>;
  updateRestaurant: ({
    data,
    id,
  }: {
    data: RestaurantDetailPutRequest;
    id: string;
  }) => Promise<RestaurantDetailPutResponse>;

  // Delivery link actions
  getDeliveryLinks: (restaurantId: string) => Promise<DeliveryLink[]>;
  addDeliveryLink: (
    restaurantId: string,
    data: Partial<DeliveryLink>
  ) => Promise<DeliveryLink>;
  updateDeliveryLink: (
    restaurantId: string,
    linkId: string,
    data: Partial<DeliveryLink>
  ) => Promise<DeliveryLink>;
  deleteDeliveryLink: (restaurantId: string, linkId: string) => Promise<void>;

  resetRestaurant: () => void;
};

const DEFAULT_BUSINESS_HOURS: BusinessHour[] = [
	{ day: "Monday", open: "09:00", close: "17:00", closed: false },
	{ day: "Tuesday", open: "09:00", close: "17:00", closed: false },
	{ day: "Wednesday", open: "09:00", close: "17:00", closed: false },
	{ day: "Thursday", open: "09:00", close: "17:00", closed: false },
	{ day: "Friday", open: "09:00", close: "17:00", closed: false },
	{ day: "Saturday", open: "09:00", close: "17:00", closed: false },
	{ day: "Sunday", open: "09:00", close: "17:00", closed: false },
  ];
const DEFAULT_RESTAURANT_DATA: Restaurant = {
  _id: "",
  name: "",
  logo: undefined,
  description: "",
  cuisine: [],
  priceRange: "$",
  address: "",
  phone: "",
  email: "",
  website: "",
  businessHours: DEFAULT_BUSINESS_HOURS,
  features: [],
  gallery: [],
  meta: {},
  owner: false,
  ownerId: "",
};

const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set) => ({
      restaurantData: DEFAULT_RESTAURANT_DATA,
      restaurantDatas: [DEFAULT_RESTAURANT_DATA],
      isLoading: false,
      error: null,

      createRestaurant: async (data: CreateRestaurantRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post<CreateRestaurantResponse>(
            "/restaurants",
            data
          );

          set({
            restaurantData: response.data,
          });
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getRestaurantsByName: async (name: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.get<SearchRestaurantsResponse>(
            `/restaurants/search/${name}`
          );

          if (response.data.length === 0) {
            set({ restaurantData: DEFAULT_RESTAURANT_DATA });
          }

          set({
            restaurantDatas: response.data,
          });
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getRestaurantById: async (id: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.get<RestaurantDetailGetResponse>(
            `/restaurants/${id}`
          );

          set({
            restaurantData: response.data,
          });
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getRestaurantByOwnerId: async (ownerId: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.get<GetRestaurantByOwnerResponse>(
            `/restaurants/owner/${ownerId}`
          );

          set({
            restaurantData: response.data,
          });
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateRestaurant: async ({
        data,
        id,
      }: {
        data: RestaurantDetailPutRequest;
        id: string;
      }) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.put<RestaurantDetailPutResponse>(
            `/restaurants/${id}`,
            data
          );

          set({
            restaurantData: response.data,
          });

          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Delivery link operations
      getDeliveryLinks: async (restaurantId: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.get<DeliveryLink[]>(
            `/restaurants/${restaurantId}/delivery-links`
          );
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addDeliveryLink: async (
        restaurantId: string,
        data: Partial<DeliveryLink>
      ) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post<DeliveryLink>(
            `/restaurants/${restaurantId}/delivery-links`,
            data
          );
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateDeliveryLink: async (
        restaurantId: string,
        linkId: string,
        data: Partial<DeliveryLink>
      ) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.put<DeliveryLink>(
            `/restaurants/${restaurantId}/delivery-links/${linkId}`,
            data
          );
          return response.data;
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteDeliveryLink: async (restaurantId: string, linkId: string) => {
        try {
          set({ isLoading: true, error: null });
          await apiClient.delete(
            `/restaurants/${restaurantId}/delivery-links/${linkId}`
          );
        } catch (error) {
          const errorMessage = handleApiError(error);
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetRestaurant: () =>
        set({ restaurantData: DEFAULT_RESTAURANT_DATA, error: null }),
    }),
    {
      name: "restaurant-store", // unique name
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating restaurant store state", state);
      },
    }
  )
);

export default useRestaurantStore;

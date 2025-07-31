import type{ FoodCatalogue } from "shared/types/api/schemas";
import type { Currency } from "shared/types/common";
import { create } from "zustand";
import apiClient from "../utils/authClient";

type FoodDataStore = {
  // State
  foodData: FoodCatalogue;
  foodDatas: FoodCatalogue[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createFoodData: (
    FoodData: FoodCatalogue
  ) => Promise<{ success: boolean; error: string | null; data?: FoodCatalogue }>;
  getFoodDatas: (restaurantId: string) => Promise<void>;
  getFoodDataById: ({
    foodId,
    restaurantId,
  }: {
    foodId: string;
    restaurantId: string;
  }) => Promise<{ success: boolean; error: string | null }>;
  updateFoodData: ({
    foodId,
    restaurantId,
    foodData,
  }: {
    foodId: string;
    restaurantId: string;
    foodData: FoodCatalogue;
  }) => Promise<void>;
  deleteFoodData: ({
    foodId,
    restaurantId,
  }: {
    foodId: string;
    restaurantId: string;
  }) => Promise<void>;
  resetFoodDatas: () => void;
};


export const DEFAULT_FOOD_DATA: FoodCatalogue = {
  _id: "",
  name: "",
  ingredients: [],
  cuisineType: {_id: "", name: "", description: ""},
  course: {_id: "", name: "", description: ""},
  price: {
    currency: "GBP" as Currency,
    amount: 0,
  },
  allergens: [],
  images: [],
  restaurant: "",
  isAvailable: true,
  isFeatured: false,
};
const useFoodDataStore = create<FoodDataStore>((set, get) => ({
  foodData: DEFAULT_FOOD_DATA,
  foodDatas: [],
  isLoading: false,
  error: null,

  createFoodData: async (foodData: FoodCatalogue) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.post('/food-catalogue', foodData);
      const newFood = response.data;
      set(({
        foodDatas: get().foodDatas
          ? [...get().foodDatas, newFood]
          : [newFood],
      }));
      return { success: true, error: null, data: newFood };
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error has occurred",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getFoodDatas: async (restaurantId: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.get(
        `/food-catalogue/restaurant/${restaurantId}`
      );

      set({ foodDatas: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },
  getFoodDataById: async ({
    foodId,
    restaurantId,
  }: {
    foodId: string;
    restaurantId: string;
  }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.get(
        `/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`
      );
      console.log(response.data);
      

      set({ foodData: response.data, isLoading: false });
      return { success: true, error: null };
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error has occurred",
      };
    }
  },

  updateFoodData: async ({
    foodId,
    restaurantId,
    foodData,
  }: {
    foodId: string;
    restaurantId: string;
    foodData: FoodCatalogue;
  }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.put(
        `/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`,
        foodData
      );

      set({ foodData: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  deleteFoodData: async ({
    restaurantId,
    foodId,
  }: {
    restaurantId: string;
    foodId: string;
  }) => {
    try {
      set({ error: null, isLoading: true });

      await apiClient.delete(
        `/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`
      );

      set((state) => ({
        foodDatas: state.foodDatas?.filter(
          (food) => food?._id !== foodId
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  resetFoodDatas: () =>
    set({
      foodDatas: [],
      error: null,
      isLoading: false,
    }),
}));

export default useFoodDataStore;

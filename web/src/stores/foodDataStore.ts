import { DetailedFoodData, FoodData } from "@/types/foodCatalogue";
import axios from "axios";
import { create } from "zustand";

type FoodDataStore = {
  // State
  foodData: FoodData;
  foodDatas: FoodData[];
  DetailedFoodDatas?: DetailedFoodData[];
  DetailedFoodData?: DetailedFoodData;
  isLoading: boolean;
  error: string | null;

  // Actions
  createFoodData: (
    FoodData: FoodData
  ) => Promise<{ success: boolean; error: string | null }>;
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
    foodData: FoodData;
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

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_FOOD_DATA = {
  _id: "",
  name: "",
  ingredients: [],
  cuisineType: "",
  course: "",
  price: {
    currency: "",
    amount: 0,
  },
  allergens: [],
  images: [],
  restaurant: "",
};
const useFoodDataStore = create<FoodDataStore>((set, get) => ({
  foodData: DEFAULT_FOOD_DATA,
  foodDatas: [DEFAULT_FOOD_DATA],
  isLoading: false,
  error: null,

  createFoodData: async (foodData: FoodData) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post(`${API_URL}/food-catalogue`, foodData);
      const newFood = response.data;
      set((state) => ({
        DetailedFoodDatas: get().DetailedFoodDatas
          ? [...get().DetailedFoodDatas!, newFood]
          : [newFood],
      }));
      return { success: true, error: null };
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

      const response = await axios.get(
        `${API_URL}/food-catalogue/restaurant/${restaurantId}`
      );

      set({ DetailedFoodDatas: response.data, isLoading: false });
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

      const response = await axios.get(
        `${API_URL}/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`
      );
      console.log(response.data);
      

      set({ DetailedFoodData: response.data, isLoading: false });
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
    foodData: FoodData;
  }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.put(
        `${API_URL}/food-catalogue/restaurant/${restaurantId}/catalogue/${foodId}`,
        foodData
      );

      set({ DetailedFoodData: response.data, isLoading: false });
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

      await axios.delete(
        `${API_URL}/restaurant/${restaurantId}/catalogue/${foodId}`
      );

      set((state) => ({
        DetailedFoodDatas: state.DetailedFoodDatas?.filter(
          (food) => food._id !== foodId
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
      foodDatas: [DEFAULT_FOOD_DATA],
      DetailedFoodDatas: [],
      error: null,
      isLoading: false,
    }),
}));

export default useFoodDataStore;

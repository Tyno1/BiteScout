import { Cuisine } from "@/types/foodCatalogue";
import axios from "axios";
import { create } from "zustand";

type CuisineStore = {
  // State
  cuisines: Cuisine[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createCuisine: (cuisine: Cuisine) => Promise<void>;
  getCuisines: () => Promise<void>;
  getCuisine: (id: string) => Promise<void>;
  updateCuisine: ({
    id,
    cuisine,
  }: {
    id: string;
    cuisine: Cuisine;
  }) => Promise<void>;
  deleteCuisine: (id: string) => Promise<void>;
  resetCuisines: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_CUISINES = [{ _id: "", name: "", description: "" }];

const useCuisineStore = create<CuisineStore>((set) => ({
  cuisines: DEFAULT_CUISINES,
  isLoading: false,
  error: null,

  createCuisine: async (cuisine: Cuisine) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post(`${API_URL}/cuisines`, cuisine);

      set({ cuisines: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  getCuisines: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/cuisines`);

      set({ cuisines: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  getCuisine: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/cuisines/${id}`);

      set({ cuisines: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  updateCuisine: async ({ id, cuisine }: { id: string; cuisine: Cuisine }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.put(`${API_URL}/cuisines/${id}`, {
        cuisine,
      });

      set({ cuisines: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  deleteCuisine: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      await axios.delete(`${API_URL}/cuisines/${id}`);

      set((state) => ({
        Cuisines: state.cuisines.filter((cuisine) => cuisine._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  resetCuisines: () =>
    set({ cuisines: DEFAULT_CUISINES, error: null, isLoading: false }),
}));

export default useCuisineStore;

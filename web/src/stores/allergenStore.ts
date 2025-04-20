import { Allergen } from "@/types/foodCatalogue";
import axios from "axios";
import { create } from "zustand";

type AllergenStore = {
  // State
  allergens: Allergen[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createAllergen: (allergen: Allergen) => Promise<void>;
  getAllergens: () => Promise<Allergen[]>;
  getAllergen: (id: string) => Promise<Allergen | null>;
  updateAllergen: ({
    id,
    allergen,
  }: {
    id: string;
    allergen: Allergen;
  }) => Promise<void>;
  deleteAllergen: (id: string) => Promise<void>;
  resetAllergens: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_ALLERGENS = [{ _id: "", name: "", description: "" }];

const useAllergenStore = create<AllergenStore>((set) => ({
  allergens: DEFAULT_ALLERGENS,
  isLoading: false,
  error: null,

  createAllergen: async (allergen: Allergen) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post(`${API_URL}/allergens`, { allergen });

      set({ allergens: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  getAllergens: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/allergens`);

      set({ allergens: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
      return [];
    }
  },
  getAllergen: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/allergens/${id}`);

      set({ allergens: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
      return null;
    }
  },

  updateAllergen: async ({
    id,
    allergen,
  }: {
    id: string;
    allergen: Allergen;
  }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.put(`${API_URL}/allergens/${id}`, {
        allergen,
      });

      set({ allergens: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  deleteAllergen: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      await axios.delete(`${API_URL}/allergens/${id}`);

      set((state) => ({
        allergens: state.allergens.filter((allergen) => allergen._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  resetAllergens: () =>
    set({ allergens: DEFAULT_ALLERGENS, error: null, isLoading: false }),
}));

export default useAllergenStore;

import type { 
  CreateAllergenRequest, 
  CreateAllergenResponse,
  DeleteAllergenResponse,
  GetAllAllergensResponse,
  GetAllergenByIdResponse,
  UpdateAllergenRequest,
  UpdateAllergenResponse
} from "@shared/types/allergens";
import axios from "axios";
import { create } from "zustand";
import { handleApiError } from "../utils/apiErrorHandler";

type AllergenStore = {
  // State
  allergens: GetAllAllergensResponse;
  isLoading: boolean;
  error: string | null;

  // Actions
  createAllergen: (allergen: CreateAllergenRequest) => Promise<CreateAllergenResponse | null>;
  getAllergens: () => Promise<GetAllAllergensResponse>;
  getAllergen: (id: string) => Promise<GetAllergenByIdResponse | null>;
  updateAllergen: (id: string, allergen: UpdateAllergenRequest) => Promise<UpdateAllergenResponse | null>;
  deleteAllergen: (id: string) => Promise<DeleteAllergenResponse | null>;
  resetAllergens: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const useAllergenStore = create<AllergenStore>((set) => ({
  allergens: [],
  isLoading: false,
  error: null,

  createAllergen: async (allergen: CreateAllergenRequest) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post<CreateAllergenResponse>(`${API_URL}/allergens`, allergen);

      // Update the allergens list with the new allergen
      set((state) => ({
        allergens: [...state.allergens, response.data],
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  getAllergens: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get<GetAllAllergensResponse>(`${API_URL}/allergens`);

      set({ allergens: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return [];
    }
  },

  getAllergen: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get<GetAllergenByIdResponse>(`${API_URL}/allergens/${id}`);

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  updateAllergen: async (id: string, allergen: UpdateAllergenRequest) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.put<UpdateAllergenResponse>(`${API_URL}/allergens/${id}`, allergen);

      // Update the allergen in the list
      set((state) => ({
        allergens: state.allergens.map((item) => 
          item._id === id ? response.data : item
        ),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  deleteAllergen: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.delete<DeleteAllergenResponse>(`${API_URL}/allergens/${id}`);

      // Remove the allergen from the list
      set((state) => ({
        allergens: state.allergens.filter((allergen) => allergen._id !== id),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  resetAllergens: () =>
    set({ allergens: [], error: null, isLoading: false }),
}));

export default useAllergenStore;

import type{ Cuisine } from "shared/types/api/schemas";
import type { 
  CreateCuisineRequest, 
  CreateCuisineResponse,
  DeleteCuisineResponse,
  GetAllCuisinesResponse,
  GetCuisineByIdResponse,
  UpdateCuisineRequest,
  UpdateCuisineResponse
} from "shared/types/cuisines";
import { create } from "zustand";
import { handleApiError } from "../utils/apiErrorHandler";
import apiClient from "../utils/authClient";

type CuisineStore = {
	// State
	cuisines: Cuisine[];
	isLoading: boolean;
	error: string | null;

	// Actions
	createCuisine: (cuisine: CreateCuisineRequest) => Promise<CreateCuisineResponse | null>;
	getCuisines: (onSuccess?: (cuisines: GetAllCuisinesResponse) => void) => Promise<GetAllCuisinesResponse>;
	getCuisine: (id: string) => Promise<GetCuisineByIdResponse | null>;
	updateCuisine: (id: string, cuisine: UpdateCuisineRequest) => Promise<UpdateCuisineResponse | null>;
	deleteCuisine: (id: string) => Promise<DeleteCuisineResponse | null>;
	resetCuisines: () => void;
};

const useCuisineStore = create<CuisineStore>((set) => ({
	cuisines: [],
	isLoading: false,
	error: null,

	createCuisine: async (cuisine: CreateCuisineRequest) => {
		try {
			set({ error: null, isLoading: true });

			const response = await apiClient.post<CreateCuisineResponse>(`/cuisines`, cuisine);

			// Update the cuisines list with the new cuisine
			set((state) => ({
				cuisines: [...state.cuisines, response.data],
				isLoading: false,
			}));

			return response.data;
		} catch (error) {
			const errorMessage = handleApiError(error);
			set({ error: errorMessage, isLoading: false });
			return null;
		}
	},

	getCuisines: async (onSuccess?: (cuisines: GetAllCuisinesResponse) => void) => {
		try {
			set({ error: null, isLoading: true });

			const response = await apiClient.get<GetAllCuisinesResponse>(`/cuisines`);

			set({ cuisines: response.data, isLoading: false });
			if (onSuccess) {
				onSuccess(response.data);
			}
			return response.data;
		} catch (error) {
			const errorMessage = handleApiError(error);
			set({ error: errorMessage, isLoading: false });
			return [];
		}
	},

	getCuisine: async (id: string) => {
		try {
			set({ error: null, isLoading: true });

			const response = await apiClient.get<GetCuisineByIdResponse>(`/cuisines/${id}`);

			set({ isLoading: false });
			return response.data;
		} catch (error) {
			const errorMessage = handleApiError(error);
			set({ error: errorMessage, isLoading: false });
			return null;
		}
	},

	updateCuisine: async (id: string, cuisine: UpdateCuisineRequest) => {
		try {
			set({ error: null, isLoading: true });

			const response = await apiClient.put<UpdateCuisineResponse>(`/cuisines/${id}`, cuisine);

			// Update the cuisine in the list
			set((state) => ({
				cuisines: state.cuisines.map((item) => 
					item._id === id ? response.data : item
				),
				isLoading: false,
			}));

			return response.data;
		} catch (error) {
			const errorMessage = handleApiError(error);
			set({ error: errorMessage, isLoading: false });
			return null;
		}
	},

	deleteCuisine: async (id: string) => {
		try {
			set({ error: null, isLoading: true });

			const response = await apiClient.delete<DeleteCuisineResponse>(`/cuisines/${id}`);

			// Remove the cuisine from the list
			set((state) => ({
				cuisines: state.cuisines.filter((cuisine) => cuisine._id !== id),
				isLoading: false,
			}));

			return response.data;
		} catch (error) {
			const errorMessage = handleApiError(error);
			set({ error: errorMessage, isLoading: false });
			return null;
		}
	},

	resetCuisines: () => set({ cuisines: [], error: null, isLoading: false }),
}));

export default useCuisineStore;

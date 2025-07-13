import type{ Cuisine } from "@shared/types/api/schemas";
import type { 
  CreateCuisineRequest, 
  CreateCuisineResponse,
  DeleteCuisineResponse,
  GetAllCuisinesResponse,
  GetCuisineByIdResponse,
  UpdateCuisineRequest,
  UpdateCuisineResponse
} from "@shared/types/cuisines";
import axios from "axios";
import { create } from "zustand";
import { handleApiError } from "../utils/apiErrorHandler";

type CuisineStore = {
	// State
	cuisines: Cuisine[];
	isLoading: boolean;
	error: string | null;

	// Actions
	createCuisine: (cuisine: CreateCuisineRequest) => Promise<CreateCuisineResponse | null>;
	getCuisines: () => Promise<GetAllCuisinesResponse>;
	getCuisine: (id: string) => Promise<GetCuisineByIdResponse | null>;
	updateCuisine: (id: string, cuisine: UpdateCuisineRequest) => Promise<UpdateCuisineResponse | null>;
	deleteCuisine: (id: string) => Promise<DeleteCuisineResponse | null>;
	resetCuisines: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const useCuisineStore = create<CuisineStore>((set, get) => ({
	cuisines: [],
	isLoading: false,
	error: null,

	createCuisine: async (cuisine: CreateCuisineRequest) => {
		try {
			set({ error: null, isLoading: true });

			const response = await axios.post<CreateCuisineResponse>(`${API_URL}/cuisines`, cuisine);

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

	getCuisines: async () => {
		try {
			set({ error: null, isLoading: true });

			const response = await axios.get<GetAllCuisinesResponse>(`${API_URL}/cuisines`);

			set({ cuisines: response.data, isLoading: false });
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

			const response = await axios.get<GetCuisineByIdResponse>(`${API_URL}/cuisines/${id}`);

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

			const response = await axios.put<UpdateCuisineResponse>(`${API_URL}/cuisines/${id}`, cuisine);

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

			const response = await axios.delete<DeleteCuisineResponse>(`${API_URL}/cuisines/${id}`);

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

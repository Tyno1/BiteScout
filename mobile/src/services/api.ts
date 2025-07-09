import axios from "axios";
import type { ReviewRequest, SearchFilters, User } from "../types";

// Create axios instance with base configuration
const api = axios.create({
	baseURL: "http://localhost:3000/api", // Update with your backend URL
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add auth token
api.interceptors.request.use(
	(config) => {
		// TODO: Get token from secure storage
		const token = ""; // await SecureStore.getItemAsync('authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle common errors
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized access
			// TODO: Redirect to login or refresh token
		}
		return Promise.reject(error);
	},
);

// Auth API endpoints
export const authAPI = {
	login: (email: string, password: string) =>
		api.post("/auth/login", { email, password }),

	register: (name: string, email: string, password: string) =>
		api.post("/auth/register", { name, email, password }),

	logout: () => api.post("/auth/logout"),

	refreshToken: (refreshToken: string) =>
		api.post("/auth/refresh", { refreshToken }),
};

// Restaurant API endpoints
export const restaurantAPI = {
	search: (query: string, filters?: SearchFilters) =>
		api.get("/restaurants/search", { params: { query, ...filters } }),

	getById: (id: string) => api.get(`/restaurants/${id}`),

	getMenu: (id: string) => api.get(`/restaurants/${id}/menu`),

	getReviews: (id: string) => api.get(`/restaurants/${id}/reviews`),

	addReview: (id: string, review: ReviewRequest) =>
		api.post(`/restaurants/${id}/reviews`, review),
};

// User API endpoints
export const userAPI = {
	getProfile: () => api.get("/user/profile"),

	updateProfile: (data: Partial<User>) => api.put("/user/profile", data),

	getFavorites: () => api.get("/user/favorites"),

	addFavorite: (restaurantId: string) =>
		api.post("/user/favorites", { restaurantId }),

	removeFavorite: (restaurantId: string) =>
		api.delete(`/user/favorites/${restaurantId}`),
};

export default api;

import apiClient from "@/utils/authClient";
import type { RestaurantAccess } from "shared/types/api/schemas";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RestaurantAccessState = {
	// state
	restaurantAccess: RestaurantAccess;
	restaurantAccessList: RestaurantAccess[];
	error: string | null;
	isLoading: boolean;

	// actions
	createRestaurantAccess: ({
		userId,
		restaurantId,
	}: {
		userId: string;
		restaurantId: string;
	}) => Promise<{
		success: boolean;
		restaurantAccess?: RestaurantAccess;
		error?: string;
	}>;

	getRestaurantListAccess: (userId: string) => Promise<{
		success: boolean;
		restaurantAccessList?: RestaurantAccess[];
		error?: string;
	}>;

	getRestaurantAccessListByOwnerId: (ownerId: string) => Promise<{
		success: boolean;
		restaurantAccessList?: RestaurantAccess[];
		error?: string;
	}>;

	grantAccess: (accessId: string) => Promise<{
		success: boolean;
		restaurantAccess?: RestaurantAccess;
		error?: string;
	}>;

	deleteAccess: (accessId: string) => Promise<{
		success: boolean;
		restaurantAccess?: RestaurantAccess;
		error?: string;
	}>;

	suspendAccess: (accessId: string) => Promise<{
		success: boolean;
		restaurantAccess?: RestaurantAccess;
		error?: string;
	}>;

	updateAccessRole: (accessId: string) => Promise<{
		success: boolean;
		restaurantAccess?: RestaurantAccess;
		error?: string;
	}>;

	resetAccess: () => void;
};
const DEFAULT_RESTAURANT_ACCESS: RestaurantAccess = {
	_id: "",
	userId: "",
	restaurantId: "",
	role: undefined,
	status: "pending",
};

const useRestaurantAccessStore = create<RestaurantAccessState>()(
	persist(
		(set, get) => ({
			restaurantAccess: DEFAULT_RESTAURANT_ACCESS,
			restaurantAccessList: [],
			isLoading: false,
			error: null,

			createRestaurantAccess: async ({
				userId,
				restaurantId,
			}: {
				userId: string;
				restaurantId: string;
			}) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.post(
						`/restaurant-access/${restaurantId}`,
						{ userId },
					);
					if (response.data) {
						set({
							restaurantAccessList: [
								...get().restaurantAccessList,
								response.data.restaurantAccess,
							],
							restaurantAccess: response.data,
						});
					}
					return {
						success: true,
						restaurantAccess: response.data,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error creating restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},

			getRestaurantListAccess: async (userId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.get(
						`/restaurant-access/user/${userId}`,
					);
					if (response.data) {
						set({ restaurantAccessList: response.data.restaurantAccesses });
					}
					return {
						success: true,
						restaurantAccessList: response.data.restaurantAccesses,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error fetching restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},

			getRestaurantAccessListByOwnerId: async (ownerId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.get(
						`/restaurant-access/owner/${ownerId}`,
					);
					if (response.data) {
						set({ restaurantAccessList: response.data.restaurantAccesses });
					}
					return {
						success: true,
						restaurantAccessList: response.data.restaurantAccesses,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error fetching restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},

			grantAccess: async (accessId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.patch(
						`/restaurant-access/access/${accessId}/grant`,
					);
					if (response.data) {
						set({
							restaurantAccessList: get().restaurantAccessList.map((item) =>
								item._id === accessId ? response.data : item,
							),
						});
					}
					return {
						success: true,
						restaurantAccess: response.data,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error granting restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},
			deleteAccess: async (accessId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.patch(
						`/restaurant-access/access/${accessId}/delete`,
					);
					if (response.data) {
						set({
							restaurantAccessList: get().restaurantAccessList.filter(
								(item) => item._id !== accessId,
							),
						});
					}
					return {
						success: true,
						restaurantAccess: response.data,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error deleting restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},
			updateAccessRole: async (accessId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.patch(
						`/restaurant-access/access/${accessId}/update`,
					);
					if (response.data) {
						set({
							restaurantAccessList: get().restaurantAccessList.map((item) =>
								item._id === accessId ? response.data : item,
							),
						});
					}
					return {
						success: true,
						restaurantAccess: response.data,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error updating restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},

			suspendAccess: async (accessId: string) => {
				set({ isLoading: true });
				try {
					const response = await apiClient.patch(
						`/restaurant-access/access/${accessId}/suspend`,
					);
					console.log(response.data, "response.data");

					if (response.data) {
						set({
							restaurantAccessList: get().restaurantAccessList.map((item) =>
								item._id === accessId ? response.data : item,
							),
						});
					}
					return {
						success: true,
						restaurantAccess: response.data,
					};
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error suspending restaurant access",
					});
					return {
						success: false,
						error:
							error instanceof Error ? error?.message : "An error occurred",
					};
				} finally {
					set({ isLoading: false });
				}
			},

			resetAccess: () =>
				set({
					restaurantAccess: DEFAULT_RESTAURANT_ACCESS,
					restaurantAccessList: [],
					error: null,
					isLoading: false,
				}),
		}),
		{
			name: "restaurantAccess",
			onRehydrateStorage: () => (state) => {
				console.log("restaurantAccessStore has been rehydrated", state);
			},
		},
	),
);

export default useRestaurantAccessStore;

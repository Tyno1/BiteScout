import { Notification } from "@/types/notification";
import { create } from "zustand";
import apiClient from "@/utils/authClient";

type NotificationStore = {
  // State
  notifications: Notification[];
  unreadCount: number;
  error: string | null;
  isLoading: boolean;

  // Actions
  fetchNotifications: (
    userId: string
  ) => Promise<{ success: boolean; error: string | null }>;
  markNotificationAsRead: (
    notificationId: string,
    userId: string
  ) => Promise<{ success: boolean; error: string | null }>;
  markAllNotificationsAsRead: (
    userId: string
  ) => Promise<{ success: boolean; error: string | null }>;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
};

const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(`/notifications/${userId}`);      
      set({
        notifications: response.data,
        unreadCount: response.data.filter((item: Notification) => !item.read)
          .length,
      });
      return { success: true, error: null };
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch notifications";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  markNotificationAsRead: async (notificationId, userId) => {
    try {
      const response = await apiClient.patch(
        `/notifications/${userId}/${notificationId}/read`,
        {}
      );
      const updatedNotification = response.data;
      const notifications = get().notifications.map((item) =>
        item._id === updatedNotification._id ? updatedNotification : item
      );
      const unreadCount = notifications.filter((item) => !item.read).length;
      set({ notifications, unreadCount });
      return { success: true, error: null };
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to mark notification as read";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  markAllNotificationsAsRead: async (userId) => {
    try {
      await apiClient.patch(`/notifications/${userId}/read-all`, {});
      const notifications = get().notifications.map((item) => ({
        ...item,
        read: true,
      }));
      set({ notifications, unreadCount: 0 });
      return { success: true, error: null };
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to mark all notifications as read";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  addNotification: (notification) => {
    const notifications = [notification, ...get().notifications];
    const unreadCount = notification.read
      ? get().unreadCount
      : get().unreadCount + 1;
    set({ notifications, unreadCount });
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));

export default useNotificationStore;

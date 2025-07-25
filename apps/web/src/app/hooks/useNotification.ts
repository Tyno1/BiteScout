import { useEffect } from "react";
import { initializeSocket, disconnectSocket } from "@/utils/socketService";
import useNotificationStore from "@/stores/notificationStore";
import type { Notification } from "shared/types/api/schemas";

type useNotificationProps = {
  userId: string | undefined;
};

type useNotificationReturn = {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
};

export const useNotifications = ({
  userId,
}: useNotificationProps): useNotificationReturn => {
  const { fetchNotifications, notifications, unreadCount, isLoading, addNotification } =
    useNotificationStore();
    
  useEffect(() => {
    if (userId) {
      // 1. Initialize socket connection for real-time updates
      initializeSocket(userId, addNotification);

      // 2. Fetch existing notifications from the API
      fetchNotifications(userId);

      // Clean up on unmount
      return () => {
        disconnectSocket();
      };
    }
  }, [userId, addNotification, fetchNotifications]);

  return { notifications, unreadCount, isLoading };
};

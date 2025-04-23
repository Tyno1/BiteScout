import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "@/state/notification/notificationSlice";
import { initializeSocket, disconnectSocket } from "@/utils/socketService";

interface useNotificationProps {
  userId: string | undefined;
  token: string;
}
export const useNotifications = ({ userId, token }: useNotificationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount, status } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    if (userId && token) {
      // 1. Initialize socket connection for real-time updates
      initializeSocket(userId, dispatch);

      // 2. Fetch existing notifications from the API
      dispatch(fetchNotifications({ userId, token }));

      // Clean up on unmount
      return () => {
        disconnectSocket();
      };
    }
  }, [userId, token, dispatch]);

  return { notifications, unreadCount, status };
};

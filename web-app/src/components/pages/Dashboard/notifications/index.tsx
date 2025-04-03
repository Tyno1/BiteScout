import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { Notification } from "@/types/notification";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/state/notification/notificationSlice";
import { useNotifications } from "@/hooks/useNotification";
import NotificationItem from "./components/NotificationItem";
import { UserContext } from "@/providers/userContext";
import { useContext, useState } from "react";
import Button from "@/components/atoms/buttons/Button";

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, token } = useContext(UserContext);
  const { notifications, unreadCount, status } = useNotifications({
    userId: userData?._id,
    token,
  });
  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null);

  const NOTIFICATION_TYPES = {
    ACCESS_REQUEST: "Access Request",
    RESERVATION: "Reservation",
    ORDER: "Order",
  };

  const handleNotificationClick = (type: string | null) => {
    setSelectedNotification(type);
  };

  const handleMarkAsRead = (notificationId: string) => {
    if (notificationId && userData._id) {
      dispatch(
        markNotificationAsRead({ notificationId, userId: userData._id, token })
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (userData._id) {
      dispatch(markAllNotificationsAsRead({ userId: userData._id, token }));
    }
  };

  if (status === "loading") {
    return (
      <div className="notifications-loading">Loading notifications...</div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="mb-10 border-b-1 border-gray-100">
        <div className="flex justify-between mb-6">
          <h3 className="text-3xl">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h3>
          {notifications.length > 0 && (
            <Button
              variant="solid"
              size="sm"
              onClick={handleMarkAllAsRead}
              text="Mark all as read"
            />
          )}
        </div>
        <div className="notification-types ">
          <button
            onClick={() => handleNotificationClick(null)}
            className={`py-2 text-gray-600 px-8 text-sm hover:border-b-1 hover: border-orange-500${
              selectedNotification === null &&
              "text-orange-500 border-b-1 border-orange-500"
            }`}
          >
            All
          </button>
          {Object.values(NOTIFICATION_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => handleNotificationClick(type)}
              className={`py-2 text-gray-600 px-8 text-sm hover:border-b-1 hover: border-orange-500${
                selectedNotification === type &&
                "text-orange-500 border-b-1 border-orange-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet</p>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notification: Notification) => (
            <NotificationItem
              key={notification?._id}
              notification={notification}
              handleMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

import { Notification } from "@/types/notification";
import {
  AccessRequestNotification,
  DefaultNotification,
  OrderNotification,
  ReservationNotification,
} from "./TypeSpecificNotification";
import { formatDistanceToNow } from "date-fns";

interface NotificationitemProp {
  notification: Notification;
  handleMarkAsRead: (notificationId: string) => void;
}
const NotificationItem: React.FC<NotificationitemProp> = ({
  notification,
  handleMarkAsRead,
}) => {
  const handleClick = () => {
    if (!notification.read && notification._id) {
      handleMarkAsRead(notification._id);
    }
  };

  return (
    <div
      className={`notification-item ${!notification.read ? "unread" : ""}`}
      onClick={handleClick}
    >
      {notification.type === "access-request" && (
        <AccessRequestNotification notification={notification} />
      )}

      {notification.type === "reservation" && (
        <ReservationNotification notification={notification} />
      )}

      {notification.type === "order" && (
        <OrderNotification notification={notification} />
      )}

      {/* Default fallback for other notification types */}
      {!["access-request", "reservation", "order"].includes(
        notification.type
      ) && <DefaultNotification notification={notification} />}

      <div className="text-sm italic text-gray-500">
        {formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};

export default NotificationItem;

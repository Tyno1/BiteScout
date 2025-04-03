import { useNotifications } from "@/hooks/useNotification";

interface NotificationBadgeProps {
  userId?: string;
}
const NotificationBadge = ({ userId }: NotificationBadgeProps) => {
  const { unreadCount } = useNotifications(userId);

  if (unreadCount === 0) return;

  return (
    <div className="badge bg-red-500 text-white">
      {unreadCount > 99 ? "99+" : unreadCount}
    </div>
  );
};
export default NotificationBadge;

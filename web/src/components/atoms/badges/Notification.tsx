import { useNotifications } from "@/app/hooks/useNotification";
import React from "react";

type NotificationBadgeProps = {
  userId: string | undefined;
};
export function NotificationBadge({ userId }: NotificationBadgeProps) {
  if (!userId) {
    return null; // Ensure userId is defined before calling the hook
  }
  const { unreadCount } = useNotifications({ userId });

  if (unreadCount === 0) {
    return (
      <div className="badge bg-red-500 text-white">
        {/* Display "0" if there are no unread notifications */}0
      </div>
    );
  }

  return (
    <div className="badge bg-red-500 text-white">
      {/* Display "99+" if unreadCount exceeds 99, otherwise show the actual count */}
      {unreadCount > 99 ? "99+" : unreadCount}
    </div>
  );
}

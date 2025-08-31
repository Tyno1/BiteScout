import { useNotifications } from "@/hooks/useNotification";
import React from "react";

type NotificationBadgeProps = {
  userId: string | undefined;
};

export function NotificationBadge({ userId }: NotificationBadgeProps) {
  // Call the hook first, before any conditional returns
  const { unreadCount } = useNotifications({ userId });

  // Return null if no userId or no unread notifications
  if (!userId || unreadCount === 0) {
    return null;
  }

  return (
    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
      {/* Display "99+" if unreadCount exceeds 99, otherwise show the actual count */}
      {unreadCount > 99 ? "99+" : unreadCount}
    </div>
  );
}

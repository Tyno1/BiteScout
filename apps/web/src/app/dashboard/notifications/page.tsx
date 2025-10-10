"use client";
import { AlertCircle, Bell, Shield, UserCheck, UserX } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import type { Notification } from "shared/types/api/schemas";
import { Button } from "@/components/atoms";
import useNotificationStore from "@/stores/notificationStore";

const NotificationCard = dynamic(
  () =>
    import("@/components/ui").then((mod) => ({
      default: mod.NotificationCard,
    })),
  {
    loading: () => (
      <div className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    ),
  }
);

// Define notification categories based on the API spec types
type FilteredNotificationType = {
  accessRequest: Notification[]; // access_request
  accessGranted: Notification[]; // access_granted
  accessDenied: Notification[]; // access_denied
  accessSuspended: Notification[]; // access_suspended
  restaurantUpdate: Notification[]; // restaurant_update
  system: Notification[]; // system
};

export default function Notifications() {
  const { data: session } = useSession();
  const router = useRouter();
  const { fetchNotifications, notifications, markAllNotificationsAsRead, markNotificationAsRead } =
    useNotificationStore();
  const [selectedType, setSelectedType] = useState("accessRequest");

  // Group notifications by type for better organization
  const filteredNotifications = useMemo<FilteredNotificationType>(() => {
    const groupedNotifications: FilteredNotificationType = {
      accessRequest: [],
      accessGranted: [],
      accessDenied: [],
      accessSuspended: [],
      restaurantUpdate: [],
      system: [],
    };

    for (const notification of notifications) {
      switch (notification.type) {
        case "access_request":
          groupedNotifications.accessRequest.push(notification);
          break;
        case "access_granted":
          groupedNotifications.accessGranted.push(notification);
          break;
        case "access_denied":
          groupedNotifications.accessDenied.push(notification);
          break;
        case "access_suspended":
          groupedNotifications.accessSuspended.push(notification);
          break;
        case "restaurant_update":
          groupedNotifications.restaurantUpdate.push(notification);
          break;
        case "system":
          groupedNotifications.system.push(notification);
          break;
      }
    }

    return groupedNotifications;
  }, [notifications]);

  // Map notification types to their icons for better UX
  const notificationIcons = {
    accessRequest: <Bell className="w-5 h-5" />,
    accessGranted: <UserCheck className="w-5 h-5" />,
    accessDenied: <UserX className="w-5 h-5" />,
    accessSuspended: <Shield className="w-5 h-5" />,
    restaurantUpdate: <AlertCircle className="w-5 h-5" />,
    system: <AlertCircle className="w-5 h-5" />,
  };

  // Format the type name for display (e.g., "accessRequest" -> "Access Request")
  const formatTypeName = (type: string) => {
    return type.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
  };

  // Get appropriate action buttons based on notification type
  const renderActionButtons = (notification: Notification) => {
    if (notification.type === "access_request") {
      return (
        <div className="flex space-x-2 items-center">
          <Button
            color="neutral"
            variant="outline"
            size="sm"
            text="Manage Request"
            onClick={() => router.push("/dashboard/team-management")}
          />
          <Button
            color="primary"
            variant="outline"
            size="sm"
            text="Mark as Read"
            onClick={() => notification._id && handleMarkAsRead(notification._id)}
          />
        </div>
      );
    }

    if (
      notification.type === "access_granted" ||
      notification.type === "access_denied" ||
      notification.type === "access_suspended"
    ) {
      return (
        <div className="flex space-x-2 items-center">
          <Button
            color="primary"
            variant="outline"
            size="sm"
            text="View Details"
            onClick={() => router.push("/dashboard/team-management")}
          />
          <Button
            color="primary"
            variant="outline"
            size="sm"
            text="Mark as Read"
            onClick={() => notification._id && handleMarkAsRead(notification._id)}
          />
        </div>
      );
    }

    return (
      <Button
        color="primary"
        variant="outline"
        size="sm"
        text="Mark as Read"
        onClick={() => notification._id && handleMarkAsRead(notification._id)}
      />
    );
  };

  // Count unread notifications for a specific category
  const readNotification = (notifications: Notification[]) => {
    const filter = notifications.filter((notification) => !notification.isRead);
    return filter.length;
  };

  // Mark all notifications as read
  const handlemarkAllAsRead = () => {
    if (notifications.length > 0 && session?.user?._id) {
      markAllNotificationsAsRead(session.user._id);
    }
  };

  // Mark a single notification as read
  const handleMarkAsRead = (notificationId: string) => {
    const markAsRead = async () => {
      if (session?.user?._id) {
        await markNotificationAsRead(notificationId, session.user._id);
        await fetchNotifications(session.user._id);
      }
    };
    markAsRead();
  };

  // Fetch notifications when component mounts or user changes
  useEffect(() => {
    if (session?.user?._id) {
      fetchNotifications(session.user._id);
    }
  }, [session?.user?._id, fetchNotifications]);

  return (
    <main className="w-full mx-auto px-10 py-10 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <Button
          color="primary"
          variant="solid"
          size="sm"
          text="Mark All as Read"
          onClick={handlemarkAllAsRead}
        />
      </div>

      {filteredNotifications && (
        <>
          {/* Notification category tabs */}
          <div className="flex flex-col md:flex-row justify-between mb-6 w-full md:w-[70%]">
            {Object.entries(filteredNotifications).map(([type, notification]) => (
              <button
                type="button"
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center justify-center ${
                  selectedType === type
                    ? "text-orange-500 border-b-2 border-orange-500 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                } py-3 px-4 text-sm mb-2 transition-all duration-200 ease-in-out relative`}
              >
                <span className="mr-2">
                  {notificationIcons[type as keyof typeof notificationIcons]}
                </span>
                {formatTypeName(type)}
                {readNotification(notification) > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {readNotification(notification)}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Notification list */}
          <div className="mt-4">
            {filteredNotifications[selectedType as keyof FilteredNotificationType]?.length > 0 ? (
              filteredNotifications[selectedType as keyof FilteredNotificationType].map(
                (notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    renderActionButtons={renderActionButtons}
                  />
                )
              )
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {notificationIcons[selectedType as keyof typeof notificationIcons]}
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  No {formatTypeName(selectedType)} Notifications
                </h3>
                <p className="text-gray-500 mt-2">You&apos;re all caught up!</p>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}

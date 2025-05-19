"use client";
import { Button } from "@/components/atoms";
import useNotificationStore from "@/stores/notificationStore";
import { Notification } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { Bell, Mail, AlertCircle } from "lucide-react";

type FilteredNotificationType = {
  accessRequest: Notification[];
  message: Notification[];
  system: Notification[];
};

export default function Notifications() {
  const { data: session } = useSession();
  const { fetchNotifications, notifications } = useNotificationStore();
  const [selectedType, setSelectedType] = useState("accessRequest");

  const filteredNotifications = useMemo<FilteredNotificationType>(() => {
    const groupedNotifications: FilteredNotificationType = {
      accessRequest: [],
      message: [],
      system: [],
    };

    notifications.forEach((notification) => {
      if (notification.type === "access-request") {
        groupedNotifications.accessRequest.push(notification);
      } else if (notification.type === "message") {
        groupedNotifications.message.push(notification);
      } else if (notification.type === "system") {
        groupedNotifications.system.push(notification);
      }
    });

    return groupedNotifications;
  }, [notifications]);

  useEffect(() => {
    if (session?.user?._id) {
      fetchNotifications(session.user._id);
    }
  }, [session?.user?._id, fetchNotifications]);

  // Map notification types to their icons
  const notificationIcons = {
    accessRequest: <Bell className="w-5 h-5" />,
    message: <Mail className="w-5 h-5" />,
    system: <AlertCircle className="w-5 h-5" />
  };

  // Format the type name for display
  const formatTypeName = (type: string) => {
    return type
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  // Get appropriate action buttons based on notification type
  const renderActionButtons = (notification: Notification) => {
    if (notification.type === "access-request") {
      return (
        <>
          <Button color="success" variant="plain" size="sm" text="Approve" />
          <Button color="danger" variant="plain" size="sm" text="Decline" />
        </>
      );
    } else {
      return <Button color="primary" variant="outline" size="sm" text="Mark as Read" />;
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        {filteredNotifications && (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-6 w-full md:w-[70%]">
              {Object.entries(filteredNotifications).map(
                ([type, notification]) => (
                  <button
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
                    {notification.length > 0 && (
                      <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {notification.length}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
            <div className="mt-4">
              {filteredNotifications[selectedType as keyof FilteredNotificationType]?.length > 0 ? (
                filteredNotifications[selectedType as keyof FilteredNotificationType].map((notification) => (
                  <div
                    key={notification._id}
                    className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                  >
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {notification.data.requesterName || "Notification"}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.type === "access-request" 
                          ? `is requesting access to ${notification.data.restaurantName}`
                          : notification?.data?.message || "New notification"}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>
                    <div className="flex space-x-2 w-full md:w-auto">
                      {renderActionButtons(notification)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-4">
                    {notificationIcons[selectedType as keyof typeof notificationIcons]}
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">No {formatTypeName(selectedType)} Notifications</h3>
                  <p className="text-gray-500 mt-2">You're all caught up!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
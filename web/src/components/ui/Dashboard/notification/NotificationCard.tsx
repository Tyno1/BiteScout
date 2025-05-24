import { Notification } from "@/types";
import React from "react";

type NotificationCardType = {
  notification: Notification;
  renderActionButtons: (notification: Notification) => React.ReactNode;
};

export function NotificationCard({
  notification,
  renderActionButtons,
}: NotificationCardType) {
  return (
    <div
      className={`shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center ${
        notification.read ? "bg-white" : "bg-primary/20"
      }`}
    >
      <div className="mb-4 md:mb-0">
        <h2 className="text-lg font-semibold text-gray-800">
          {notification.data.requesterName || "Notification"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {notification.type === "access-request"
            ? `is requesting access to ${notification.data.restaurantName}`
            : //remember to change this to the actual message
              notification?.data?.message || "New notification"}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(notification.createdAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
      <div className="flex space-x-2 w-full md:w-auto">
        {renderActionButtons(notification)}
      </div>
    </div>
  );
}

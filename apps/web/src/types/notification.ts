// Re-export the shared API Notification type for consistency
export type { Notification } from "shared/types/api/schemas";

// Legacy type for backward compatibility (deprecated)
export type NotificationData = {
  id?: string;
  accessId: string;
  restaurantId: string;
  restaurantName: string;
  requesterName: string;
  requesterEmail: string;
  message?: string;
  requestTime: number;
};

// Legacy type for backward compatibility (deprecated)
export type LegacyNotification = {
  _id?: string;
  read: boolean;
  userId: string;
  type: "access-request" | "message" | "system";
  data: NotificationData;
  createdAt: number;
};

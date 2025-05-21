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

export type Notification = {
  _id?: string;
  read: boolean;
  userId: string;
  type: "access-request" | "message" | "system";
  data: NotificationData;
  createdAt: number;
};

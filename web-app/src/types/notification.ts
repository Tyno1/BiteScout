export interface INotificationDataRequest {
  id?: string;
  accessId: string;
  restaurantId: string;
  restaurantName: string;
  requesterName: string;
  requesterEmail: string;
  requestTime: any;
}

export interface Notification {
  _id?: string;
  read: boolean;
  userId: string;
  type: "access-request" | "message" | "system" | string;
  data: INotificationDataRequest | any;
  createdAt: string;
}

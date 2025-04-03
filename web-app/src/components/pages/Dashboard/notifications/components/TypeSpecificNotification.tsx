import Button from "@/components/atoms/buttons/Button";
import { Notification } from "@/types/notification";

interface AccessNotificationType {
  notification: Notification;
}
export const AccessRequestNotification = ({
  notification,
}: AccessNotificationType) => (
  <div className="flex items-center justify-between">
    <div className="w-full flex flex-col items-start">
      <h4 className="text-xs text-green-900 bg-green-300 px-3 py-1 rounded-xl">
        New Access Request
      </h4>
      <p className="my-2">
        {notification.data.requesterName} requested access to{" "}
        {notification.data.restaurantName}
      </p>
    </div>
    <div className="flex gap-2">
      <Button variant="solid" color="success" text="Accept" size="sm" />
      <Button variant="solid" color="danger" text="Decline" size="sm" />

    </div>
  </div>
);

export const ReservationNotification = ({ notification }: any) => (
  <div className="notification-content">
    <h4>New Reservation</h4>
    <p>
      {notification.data.customerName} made a reservation for{" "}
      {notification.data.partySize} people at{" "}
      {new Date(notification.data.reservationTime).toLocaleTimeString()}
    </p>
  </div>
);

export const OrderNotification = ({ notification }: any) => (
  <div className="notification-content">
    <h4>Order Update</h4>
    <p>
      Order #{notification.data.orderId.substring(0, 8)} is{" "}
      {notification.data.orderStatus}
    </p>
    <p>Total: ${notification.data.orderTotal.toFixed(2)}</p>
  </div>
);

export const DefaultNotification = ({ notification }: any) => (
  <div className="notification-content">
    <h4>
      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
    </h4>
    <p>{JSON.stringify(notification.data)}</p>
  </div>
);

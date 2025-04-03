import { addNotification } from "@/state/notification/notificationSlice";
import { AppDispatch } from "@/state/store";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const backendServer = import.meta.env.VITE_BACKEND_SERVER;

export const initializeSocket = (
  userId: string,
  dispatch: AppDispatch
): Socket => {
  if (socket) return socket;

  // Connect to your backend
  socket = io(backendServer);

  socket.on("connect", () => {
    console.log("Connected to notification server");

    // Authenticate with user ID
    if (socket) {
      socket.emit("authenticate", userId);
    }
  });

  // Listen for notifications
  socket.on("notification", (notification) => {
    console.log("Received notification:", notification);

    // Dispatch to Redux store
    dispatch(addNotification(notification));

    // Optionally show a toast notification
    if (notification.type === "access-request") {
      // Using your preferred toast library
      toast.info(`New access request for ${notification.data.restaurantName}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from notification server");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

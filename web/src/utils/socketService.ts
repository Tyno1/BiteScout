import { toast } from "react-toastify";
import { type Socket, io } from "socket.io-client";

let socket: Socket | null = null;
const backendServer =
	process.env.NEXT_PUBLIC_BACKEND_URL_PLAIN || "http://localhost:5001";

export const initializeSocket = (
	userId: string,
	addNotification: (notification: { type: string; data: Record<string, unknown>; id?: string; timestamp?: string }) => void,
): Socket => {
	if (socket) return socket;

	// Connect to your backend with enhanced configuration
	socket = io(backendServer, {
		transports: ["websocket", "polling"],
		timeout: 20000,
		forceNew: true,
		reconnection: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		// Add these options to prevent namespace issues
		upgrade: true,
		rememberUpgrade: true,
		// Ensure we're connecting to the root namespace
		path: "/socket.io/",
	});

	socket.on("connect", () => {
		console.log("Connected to notification server");

		// Authenticate with user ID
		if (socket && userId) {
			socket.emit("authenticate", userId);
		}
	});

	socket.on("authenticated", (data) => {
		console.log("Socket authenticated:", data.message);
	});

	// Listen for notifications
	socket.on("notification", (notification) => {
		console.log("Received notification:", notification);

		// Dispatch to store
		addNotification(notification);

		// Optionally show a toast notification
		if (notification.type === "access-request") {
			toast.info(`New access request for ${notification.data.restaurantName}`);
		}
	});

	socket.on("disconnect", (reason) => {
		console.log("Disconnected from notification server:", reason);
	});

	socket.on("connect_error", (error) => {
		console.error("Socket connection error:", error);
		// Don't show error toast for namespace issues, just log them
		if (!error.message?.includes("Invalid namespace")) {
			toast.error("Connection to notification server failed");
		}
	});

	socket.on("error", (error) => {
		console.error("Socket error:", error);
		if (error.message && !error.message.includes("Invalid namespace")) {
			toast.error(error.message);
		}
	});

	socket.on("reconnect", (attemptNumber) => {
		console.log(
			"Reconnected to notification server after",
			attemptNumber,
			"attempts",
		);
		// Re-authenticate after reconnection
		if (userId) {
			socket?.emit("authenticate", userId);
		}
	});

	socket.on("reconnect_error", (error) => {
		console.error("Socket reconnection error:", error);
	});

	return socket;
};

export const disconnectSocket = (): void => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};

export const getSocket = (): Socket | null => {
	return socket;
};

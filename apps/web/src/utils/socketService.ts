import { toast } from "react-toastify";
import type { Notification } from "shared/types/api/schemas";
import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;
const backendServer =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

// Type for socket notifications that may have different structure
interface SocketNotification {
	_id?: string;
	id?: string;
	userId?: string;
	type:
		| "access_request"
		| "access_granted"
		| "access_denied"
		| "access_suspended"
		| "restaurant_update"
		| "system"
		| string;
	title?: string;
	message?: string;
	data?: {
		message?: string;
		[key: string]: unknown;
	};
	metadata?: Record<string, unknown>;
	timestamp?: string;
	createdAt?: string;
	updatedAt?: string;
}

// Transform socket notification to match API spec
const transformSocketNotification = (
	socketNotification: SocketNotification,
): Notification => {
	const validTypes = [
		"access_request",
		"access_granted",
		"access_denied",
		"access_suspended",
		"restaurant_update",
		"system",
	] as const;
	const notificationType = (validTypes as readonly string[]).includes(
		socketNotification.type,
	)
		? (socketNotification.type as
				| "access_request"
				| "access_granted"
				| "access_denied"
				| "access_suspended"
				| "restaurant_update"
				| "system")
		: "system";

	return {
		_id: socketNotification._id || socketNotification.id || "",
		userId: socketNotification.userId || "",
		type: notificationType,
		title: socketNotification.title || "Notification",
		message:
			socketNotification.message ||
			socketNotification.data?.message ||
			"New notification",
		isRead: false,
		metadata: socketNotification.metadata || socketNotification.data || {},
		createdAt:
			socketNotification.timestamp ||
			socketNotification.createdAt ||
			new Date().toISOString(),
		updatedAt:
			socketNotification.timestamp ||
			socketNotification.updatedAt ||
			new Date().toISOString(),
	};
};

export const initializeSocket = (
	userId: string,
	addNotification: (notification: Notification) => void,
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
		// Authenticate with user ID
		if (socket && userId) {
			socket.emit("authenticate", userId);
		}
	});

	socket.on("authenticated", () => {
		// Socket authenticated successfully
	});

	// Listen for notifications
	socket.on("notification", (socketNotification) => {
		// Transform to API spec format and dispatch to store
		const notification = transformSocketNotification(socketNotification);
		addNotification(notification);

		// Optionally show a toast notification
		if (notification.type === "access_request") {
			const restaurantName =
				notification.metadata?.restaurantName || "restaurant";
			toast.info(`New access request for ${restaurantName}`);
		}
	});

	socket.on("disconnect", () => {
		// Socket disconnected
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

	socket.on("reconnect", () => {
		// Reconnected to notification server
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

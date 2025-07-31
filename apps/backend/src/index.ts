import { createServer } from "node:http";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";

import authMiddleware from "./middleware/authmiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

import allergenRoutes from "./routes/alergen.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";
import cuisineRoutes from "./routes/cuisine.js";
import foodCatalogueRoutes from "./routes/foodCatalogue.js";
import mediaRoutes from "./routes/media.js";
import notificationRoutes from "./routes/notification.js";
import postRoutes from "./routes/post.js";
import restaurantRoutes from "./routes/restaurant.js";

import restaurantAccessRoutes from "./routes/restaurantAccess.js";
import reviewRoutes from "./routes/review.js";
import userRoutes from "./routes/user.js";
import userTypeRoutes from "./routes/userType.js";

dotenv.config();
const port = process.env.PORT || 5001;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";

const app = express();
const server = createServer(app);

// Enhanced CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
	? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
	: ["http://localhost:3000", "http://localhost:3001"];

const corsOptions = {
	origin: (
		origin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void,
	) => {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin) return callback(null, true);

		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	maxAge: 86400, // 24 hours
};

// Enhanced Socket.IO configuration
const io = new Server(server, {
	cors: {
		origin: allowedOrigins,
		methods: ["GET", "POST"],
		credentials: true,
	},
	// Add these options to prevent namespace issues
	allowEIO3: true,
	transports: ['websocket', 'polling'],
	pingTimeout: 60000,
	pingInterval: 25000,
});

const connectedUsers = new Map();

// Socket.IO connection handling with enhanced security
io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	// Rate limiting for authentication attempts
	let authAttempts = 0;
	const maxAuthAttempts = 5;
	const authTimeout = 60000; // 1 minute

	// User authentication and storing connection
	socket.on("authenticate", (userId) => {
		// Rate limiting
		if (authAttempts >= maxAuthAttempts) {
			socket.emit("error", {
				message: "Too many authentication attempts. Please try again later.",
			});
			return;
		}

		authAttempts++;

		// Basic validation
		if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
			socket.emit("error", { message: "Invalid user ID" });
			return;
		}

		// Check if user is already connected
		const existingSocketId = connectedUsers.get(userId);
		if (existingSocketId && existingSocketId !== socket.id) {
			// Disconnect existing connection
			const existingSocket = io.sockets.sockets.get(existingSocketId);
			if (existingSocket) {
				existingSocket.disconnect(true);
			}
		}

		console.log(`User ${userId} authenticated with socket ${socket.id}`);
		connectedUsers.set(userId, socket.id);

		// Reset auth attempts on successful authentication
		authAttempts = 0;

		socket.emit("authenticated", { message: "Successfully authenticated" });
	});

	socket.on("disconnect", () => {
		// Remove user from connected users when they disconnect
		for (const [userId, socketId] of connectedUsers.entries()) {
			if (socketId === socket.id) {
				connectedUsers.delete(userId);
				console.log(`User ${userId} disconnected`);
				break;
			}
		}
	});

	// Handle errors
	socket.on("error", (error) => {
		console.error("Socket error:", error);
	});

	// Set up rate limiting timeout
	setTimeout(() => {
		authAttempts = 0;
	}, authTimeout);
});

app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Connect to MongoDB with enhanced configuration
mongoose.connect(uri, {
	maxPoolSize: 10,
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
	bufferCommands: false,
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Security headers middleware
app.use((req, res, next) => {
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.setHeader("X-Frame-Options", "DENY");
	res.setHeader("X-XSS-Protection", "1; mode=block");
	res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", authMiddleware, restaurantRoutes);

app.use("/api/user-types", userTypeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurant-access", restaurantAccessRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/food-catalogue",authMiddleware, foodCatalogueRoutes);
app.use("/api/allergens", allergenRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/posts", authMiddleware, postRoutes);
app.use("/api/media", authMiddleware, mediaRoutes);
app.use("/api/reviews", authMiddleware, reviewRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

// Error handling middleware (must be last)
app.use(errorHandler);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

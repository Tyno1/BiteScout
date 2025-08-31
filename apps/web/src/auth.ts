import axios from "axios";
import NextAuth from "next-auth";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import type { UserType } from "shared/types/api/schemas";
import type {
	LoginPostRequest,
	LoginPostResponse,
} from "shared/types/auth/login";
import type { ApiError } from "shared/types/common/errors";
import type { GetOwnerRestaurantsResponse } from "shared/types/restaurant/get";
import config from "./utils/config";

// Server-side refresh function that uses BACKEND_SERVER
async function refreshAccessTokenServer(token: { refreshToken: string }) {
  try {
    const response = await axios.post(`${BACKEND_SERVER}/api/auth/refresh`, {
      refreshToken: token.refreshToken
    });

    const refreshed = response.data;
    
    if (!refreshed.accessToken) {
      throw new Error("No access token returned");
    }

    return {
      ...token,
      accessToken: refreshed.accessToken,
      expiresIn: refreshed.expiresIn,
      refreshToken: refreshed.refreshToken ?? token.refreshToken, // fallback
    };
  } catch (error) {
    console.error("Error refreshing access token (server):", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// Use server-side URL for server-side requests, client-side URL for client-side requests
const BACKEND_SERVER = config.backend.server;

async function getUserTypeDetails(userType: UserType["name"]) {
	try {
		const response = await axios.get(
			`${BACKEND_SERVER}/api/user-types/${userType}`,
		);

		if (response.data) {
			return {
				name: response.data.name,
				level: response.data.level,
			};
		}

		console.warn(
			`UserType details not found for: ${userType}, using guest defaults`,
		);
		return { name: "guest", level: 4 };
	} catch (error) {
		// Log detailed error information for debugging
		if (axios.isAxiosError(error)) {
			console.error(`Error fetching user type details for ${userType}:`, {
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: error.response?.data,
				message: error.message,
			});
		} else {
			console.error(
				`Unexpected error fetching user type details for ${userType}:`,
				error,
			);
		}

		// Return guest defaults as fallback
		return { name: "guest", level: 4 };
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 0, // Allow immediate session updates for development
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text", placeholder: "email@email.com" },
				password: { label: "password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials");
				}

				try {
					const response = await axios.post<LoginPostResponse>(
						`${BACKEND_SERVER}/api/auth/login`,
						{
							email: credentials.email,
							password: credentials.password,
						} as LoginPostRequest,
					);

					if (response.data?.accessToken) {
						const { user, accessToken, refreshToken, expiresIn } =
							response.data;

						return {
							_id: user?._id || "",
							name: user?.name || "",
							email: user?.email || "",
							accessToken,
							refreshToken,
							expiresIn,
							userType: user?.userType,
						};
					}
					throw new Error("Invalid credentials");
				} catch (error) {
					if (axios.isAxiosError(error) && error.response?.data) {
						const apiError = error.response.data as ApiError;

						// Map API error codes to user-friendly messages
						const errorMessages: Record<string, string> = {
							AUTHENTICATION_ERROR: "Invalid email or password",
							RATE_LIMIT_EXCEEDED:
								"Too many login attempts. Please try again later.",
							VALIDATION_ERROR: "Invalid input data",
							INTERNAL_SERVER_ERROR: "Server error. Please try again later.",
						};

						const message =
							errorMessages[apiError.code] ||
							apiError.message ||
							"Login failed";
						throw new Error(message);
					}

					// Handle network or other errors
					if (axios.isAxiosError(error)) {
						if (error.code === "ECONNABORTED") {
							throw new Error("Request timeout. Please try again.");
						}
						if (!error.response) {
							throw new Error("Network error. Please check your connection.");
						}
					}

					// Fallback for unknown errors
					throw new Error("An unexpected error occurred. Please try again.");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }: { 
			token: JWT; 
			user?: User; 
			trigger?: "signIn" | "signUp" | "update"; 
			session?: Session;
		}) {
			try {
				// Handle update trigger first (before expiration check)
				if (trigger === "update" && session) {
					token.restaurantCount = session.user.restaurantCount;
					token.userType = session.user.userType;
					return token;
				}

				// Only update token when user is provided (on sign in)
				if (user) {
					token._id = user._id;
					token.userType = user.userType;
					token.accessToken = user.accessToken;
					token.refreshToken = user.refreshToken;
					token.expiresIn = user.expiresIn; // Set expiration time
				}

				// Check if token is expired
				if (Date.now() < (token.expiresIn as number)) {
					return token;
				}

				// If the token is expired, try to refresh it (server-side)
				const refreshedToken = await refreshAccessTokenServer({ refreshToken: token.refreshToken as string });
				return {
					...token,
					...refreshedToken,
				};
			} catch (error) {
				console.error("Error in JWT callback:", error);
				return {
					...token,
					error: "RefreshAccessTokenError",
				};
			}
		},

		async session({ session, token }: { session: Session; token: JWT }) {
			try {
				if (token.accessToken) {
					session.user.accessToken = token.accessToken as string;
					session.user.refreshToken = token.refreshToken as string;
				}
				// Add token data to session
				session.user._id = token._id as string;

				// Use token values for userType and restaurantCount if they exist
				if (token.userType) {
					session.user.userType = token.userType as string;
					session.user.userTypeDetails = await getUserTypeDetails(
						token.userType as UserType["name"],
					);
				} else {
					// Set default values when userType is missing
					session.user.userType = "guest";
					session.user.userTypeDetails = { name: "guest", level: 4 };
				}

				// Use token restaurantCount if it exists, otherwise fetch from backend
				if (token.restaurantCount !== undefined) {
					session.user.restaurantCount = token.restaurantCount;
				} else if (token._id && token.userType !== "guest") {
					// Only fetch restaurant count for non-guest users (owners/admins/moderators)
					try {
						const restaurant = await axios.get<GetOwnerRestaurantsResponse>(
							`${BACKEND_SERVER}/api/restaurants/owner-restaurants/${token._id}`,
							{
								headers: {
									Authorization: `Bearer ${token.accessToken}`,
								},
							},
						);

						const restaurantCount = restaurant.data.length;
						token.restaurantCount = restaurantCount; // Cache in token
						session.user.restaurantCount = restaurantCount;
					} catch (error) {
						console.error("Error fetching restaurant count:", error);
						session.user.restaurantCount = 0;
					}
				} else {
					// For guest users, set restaurant count to 0
					session.user.restaurantCount = 0;
				}

				return session;
			} catch (error) {
				console.error("Error in session callback:", error);
				return session;
			}
		},
	},
	pages: {
		signIn: "/login",
		error: "/login",
	},
	debug: process.env.NODE_ENV === "development",
});

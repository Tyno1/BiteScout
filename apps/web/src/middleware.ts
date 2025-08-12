import type { Session } from "@auth/core/types";
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AccessRoles } from "shared/types/api/schemas";
import { checkRestaurantAccessAction } from "./app/actions/checkRestaurantAccessAction";
import { getCurrentSession } from "./app/actions/getSessionAction";
import { needsRestaurantAccess } from "./app/config/restaurantRoutes";
import { Permissions } from "./app/permissions";
import { getMatchingRoute } from "./utils/getMatchingRoute";
import { getRoleFromToken } from "./utils/getRoleFromSession";

// Helper function to extract restaurant ID from various route patterns
function extractRestaurantId(request: NextRequest): string | null {
  const { pathname, searchParams } = request.nextUrl;
  
  // Method 1: URL parameter (most common)
  const idFromParams = searchParams.get('id') || searchParams.get('restaurantId');
  if (idFromParams) return idFromParams;
  
  // Method 2: Restaurant profile route pattern
  if (pathname.startsWith("/dashboard/restaurant-profile/")) {
    const segments = pathname.split('/');
    const restaurantIndex = segments.findIndex(segment => segment === 'restaurant-profile');
    if (restaurantIndex !== -1 && segments[restaurantIndex + 1]) {
      return segments[restaurantIndex + 1];
    }
  }
  
  return null;
}

export async function middleware(request: NextRequest) {
	try {
		const { nextUrl } = request;
		const pathname = nextUrl.pathname;

		// Skip middleware for static files and API routes
		if (
			pathname.startsWith("/api/") ||
			pathname.startsWith("/_next/") ||
			pathname === "/favicon.ico" ||
			pathname.startsWith("/static/") ||
			pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
		) {
			return NextResponse.next();
		}

		const publicPaths = [
			"/",
			"/login",
			"/register",
			"register/success",
			"/login/loading",
			"/about",
			"services",
			"/contact",
		];

		// Check if the request is for a public path and skip
		if (publicPaths.includes(pathname)) return NextResponse.next();

		// Get session with error handling
		let session: Session | null = null;
		try {
			session = await getCurrentSession();
		} catch (sessionError: unknown) {
			console.error("Session error in middleware:", sessionError);
			return NextResponse.redirect(new URL("/login", nextUrl));
		}

		// check if user is authenticated
		if (!session?.user) {
			return NextResponse.redirect(new URL("/login", nextUrl));
		}

		// Validate access token
		if (!session.user.accessToken) {
			console.warn("User session missing access token");
			return NextResponse.redirect(new URL("/login", nextUrl));
		}

		// Get user role with error handling
		let role: AccessRoles | null = null;
		try {
			role = getRoleFromToken(session.user.accessToken);
		} catch (roleError: unknown) {
			console.error("Role extraction error:", roleError);
			return NextResponse.redirect(new URL("/login", nextUrl));
		}

		if (!role) {
			console.warn("No role found for user");
			return NextResponse.redirect(new URL("/login", nextUrl));
		}

		const matchingRoute = getMatchingRoute(pathname);

		if (!matchingRoute) return NextResponse.next();

		const allowedRoles = Permissions[matchingRoute];

		// Debug logs removed for production performance

		if (allowedRoles && !allowedRoles.includes(role)) {
			console.log("Access denied: User role", role, allowedRoles);
			
			console.warn(
				`Access denied: User role ${role} not allowed for route ${pathname}`,
			);
			const nextUrl = request.nextUrl.clone();
			nextUrl.pathname = "/dashboard/unauthorized";
			return NextResponse.rewrite(nextUrl);
		}

		// 🎯 NEW: Restaurant-specific access control using server action
		// Check if this is a restaurant-related route that needs specific access
		if (needsRestaurantAccess(pathname)) {
			const restaurantId = extractRestaurantId(request);
			
			// If no restaurant ID in URL, allow access (user will see their own restaurant)
			if (!restaurantId) {
				return NextResponse.next();
			}
			
			// Check if user has access to this specific restaurant using server action
			const { hasAccess, error } = await checkRestaurantAccessAction(
				session.user._id,
				restaurantId,
				role
			);
			
			if (!hasAccess) {
				console.warn(
					`Restaurant access denied: User ${session.user._id} not allowed for restaurant ${restaurantId} on route ${pathname}. Error: ${error}`,
				);
				const nextUrl = request.nextUrl.clone();
				nextUrl.pathname = "/dashboard/unauthorized";
				return NextResponse.rewrite(nextUrl);
			}
		}

		// If all checks pass, allow the request to proceed
		return NextResponse.next();
	} catch (error) {
		console.error("Middleware error:", error);

		// In case of critical errors, redirect to login for security
		const nextUrl = request.nextUrl.clone();
		return NextResponse.redirect(new URL("/login", nextUrl));
	}
}

// Define the matcher - this tells Next.js which paths to run the middleware on
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};

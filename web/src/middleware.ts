// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentSession } from "./app/actions/getSessionAction";
import { Permissions } from "./app/permissions";
import { getMatchingRoute } from "./utils/getMatchingRoute";
import { getRoleFromToken } from "./utils/getRoleFromSession";

export async function middleware(request: NextRequest) {
  try {
    const { nextUrl } = request;
    const pathname = nextUrl.pathname;
    const session = await getCurrentSession();

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname === "/favicon.ico" ||
      pathname.startsWith("/static/") ||
      pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
    ) {
      return NextResponse.next();
    } // get user role from token

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

    // check if user is authenticated
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    const role = getRoleFromToken(session?.user?.accessToken ?? "");
    const matchingRoute = getMatchingRoute(pathname);

    if (!matchingRoute) return NextResponse.next();

    const allowedRoles = Permissions[matchingRoute];

    if (allowedRoles && !allowedRoles.includes(role)) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname = "/dashboard/unauthorized";
      return NextResponse.rewrite(nextUrl);
    }

    //   // If all checks pass, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
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

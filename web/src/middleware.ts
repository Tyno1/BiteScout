// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentSession } from "./app/actions/getSessionAction";
import { jwtDecode } from "jwt-decode";

// function getRoleFromToken(sessionToken) {}

export async function middleware(request: NextRequest) {
  try {
    const { nextUrl } = request;
    const session = await getCurrentSession();
    // console.log(session);

    const token = jwtDecode(session?.user?.accessToken ?? "");
    // console.log("token",token);
    

    // // Define protected paths
    // const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

    // if (isProtectedRoute && !authToken) {
    //   return NextResponse.redirect(new URL("/login", nextUrl));
    // }

    // // Auth pages (login, register)
    // const isAuthPage =
    //   nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

    // // if in authpage with token present, redirect to onboarding
    // if (isAuthPage && authToken) {
    //   return NextResponse.redirect(new URL("/login/loading", nextUrl));
    // }

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

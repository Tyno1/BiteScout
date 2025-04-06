// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const { nextUrl } = req;
    const authToken =
      req.cookies.get("authjs.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;

    // Define protected paths
    const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isProtectedRoute && !authToken) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Auth pages (login, register)
    const isAuthPage =
      nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

    // if in authpage with token present, redirect to onboarding
    if (isAuthPage && authToken) {
      return NextResponse.redirect(new URL("/onboarding/roles", nextUrl));
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
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

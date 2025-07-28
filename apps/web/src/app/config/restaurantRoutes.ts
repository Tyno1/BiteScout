// Configuration for routes that require restaurant-specific access control
export const RESTAURANT_ROUTES = {
  // Routes that need restaurant access control
  PROTECTED: [
    "/dashboard/restaurant-profile",
    "/dashboard/food-catalogue",
    "/dashboard/analytics", 
    "/dashboard/reviews",
    "/dashboard/team-management",
    "/dashboard/gallery",
    "/dashboard/settings",
  ],
  
  // Routes that don't need restaurant access (user sees their own data)
  SELF_ONLY: [
    "/dashboard", // Main dashboard
    "/dashboard/notifications", // User's own notifications
  ],
  
  // Routes that are public (no access control needed)
  PUBLIC: [
    "/dashboard/unauthorized",
    "/dashboard/onboarding",
  ],
} as const;

// Helper function to check if a route needs restaurant access
export function needsRestaurantAccess(pathname: string): boolean {
  return RESTAURANT_ROUTES.PROTECTED.some(route => pathname.startsWith(route));
}

// Helper function to check if a route is self-only (user sees their own data)
export function isSelfOnlyRoute(pathname: string): boolean {
  return RESTAURANT_ROUTES.SELF_ONLY.some(route => pathname.startsWith(route));
}

// Helper function to check if a route is public
export function isPublicRoute(pathname: string): boolean {
  return RESTAURANT_ROUTES.PUBLIC.some(route => pathname.startsWith(route));
} 
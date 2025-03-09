import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const RefreshHandler = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Only run after auth is confirmed and not during initial load
    if (!isLoading && isAuthenticated) {
      // Get last known route
      const lastRoute = localStorage.getItem("lastRoute");

      // Check if we're currently at the root of a protected section
      const isAtGenericRoute =
        window.location.pathname === "/dashboard" ||
        window.location.pathname === "/onboarding";

      // If we have a saved route and we're at a generic route, redirect
      if (
        lastRoute &&
        isAtGenericRoute &&
        lastRoute !== window.location.pathname
      ) {
        console.log("Restoring route after refresh:", lastRoute);
        window.location.href = lastRoute;
      }
      // If we're on a specific route, save it for next time
      else if (!isAtGenericRoute && window.location.pathname !== "/hub") {
        localStorage.setItem("lastRoute", window.location.pathname);
      }
    }
  }, [isAuthenticated, isLoading]);

  return null; // This component doesn't render anything
};

export default RefreshHandler;

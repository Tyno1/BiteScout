"use client";

import { Spinner } from "@/components/atoms";
import { SideNav, TopNav } from "@/components/ui";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessChecked, setAccessChecked] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const { restaurantAccessList } = useRestaurantAccess();
  const router = useRouter();

  // Stabilize the access check function to prevent unnecessary re-renders
  const checkAccessRights = useCallback(() => {
    if (isLoading || sessionStatus === "loading" || accessChecked) {
      return;
    }

    const isOwner = !!(
      session?.user?.restaurantCount && session.user.restaurantCount >= 1
    );
    const isAdmin = restaurantAccessList.some(
      (access) => access.status === "approved"
    );

    // Check access rights
    if (!isOwner && !isAdmin) {
      console.log("Redirecting to onboarding/roles...");
      router.push("/onboarding/roles");
    }

    // Mark that we've checked access
    setAccessChecked(true);
  }, [
    isLoading,
    sessionStatus,
    session?.user?.restaurantCount,
    restaurantAccessList,
    accessChecked,
    router,
  ]);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Effect to monitor hydration state
  useEffect(() => {
    // Create a function to check hydration status
    const checkHydration = () => {
      const isHydrated = true; // React Query handles hydration automatically
      if (isHydrated) {
        // Once hydrated, we can proceed with permission checks
        setIsLoading(false);
      } else {
        // Check again in a moment if not hydrated
        setTimeout(checkHydration, 100);
      }
    };

    // Start checking for hydration
    checkHydration();
  }, []);

  // Effect to check access rights once hydration is complete
  useEffect(() => {
    checkAccessRights();
  }, [checkAccessRights]);

  // Show loading state while checking permissions
  if (sessionStatus === "loading" || (isLoading && !accessChecked)) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div className="w-screen h-screen md:hidden fixed top-14 z-20">
          <SideNav setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}

      {/* Main content layout */}
      <div className="flex h-full w-full">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="w-72 shrink-0 md:block hidden overflow-hidden">
          <SideNav />
        </div>

        {/* Main content area */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {session?.user && (
            <TopNav onMenuClick={handleMenuClick} user={session.user} />
          )}
          <div className="mt-14">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

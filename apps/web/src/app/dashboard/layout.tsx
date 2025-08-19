"use client";

import { Spinner } from "@/components/atoms";
import { RestaurantContextBanner, RouteProtection, SideNav, TopNav } from "@/components/ui";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const { restaurantAccessList, isLoading: restaurantLoading } = useRestaurantAccess();
  const router = useRouter();

  const checkAccessRights = useCallback(() => {
    if (sessionStatus === "loading") return;
    
    const isOwner = !!(session?.user?.restaurantCount && session.user.restaurantCount >= 1);
    const hasApprovedAccess = restaurantAccessList.some(access => access.status === "approved");
    
    if (!isOwner && !hasApprovedAccess) {
      router.push("/onboarding/roles");
    }
  }, [sessionStatus, session?.user?.restaurantCount, restaurantAccessList, router]);

  useEffect(() => {
    checkAccessRights();
  }, [checkAccessRights]);

  if (sessionStatus === "loading" || restaurantLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      {isMenuOpen && (
        <div className="w-screen h-screen md:hidden fixed top-14 z-20">
          <SideNav setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}

      <div className="flex h-full w-full">
        <div className="w-72 shrink-0 md:block hidden overflow-hidden">
          <SideNav />
        </div>

        <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {session?.user && (
            <TopNav onMenuClick={() => setIsMenuOpen(prev => !prev)} user={session.user} />
          )}
          <div className="mt-14">
            <RouteProtection>
              {children}
            </RouteProtection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
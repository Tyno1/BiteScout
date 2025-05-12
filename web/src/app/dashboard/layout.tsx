"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SideNav from "@/components/ui/dashboard/SideNav";
import { TopNav } from "@/components/ui";
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import { Spinner } from "@/components/atoms";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { restaurantAccessList } = useRestaurantAccessStore();
  const isHydrated = useRestaurantAccessStore.persist.hasHydrated();

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isHydrated) return;

    const isOwner =
      session?.user?.restaurantCount && session.user.restaurantCount > 1;
    const isAdmin = restaurantAccessList.some(
      (access) => access.status === "approved"
    );

    setIsLoading(true);

    if (!isOwner && !isAdmin) {
      console.log("Redirecting to onboarding/roles...");
      window.location.href = "/onboarding/roles";
    }

    setIsLoading(false);
  }, [isHydrated, session?.user?.restaurantCount, restaurantAccessList]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      <TopNav
        onMenuClick={handleMenuClick}
        userName={session?.user?.name || ""}
        userId={session?.user?._id}
      />
      {/* Mobile view */}
      {isMenuOpen && (
        <div className="w-screen h-screen md:hidden fixed top-14 z-20">
          <SideNav setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
      {/* Desktop view */}
      <div className="flex h-full w-full fixed top-16">
        <div className="w-64 shrink-0 md:block hidden overflow-hidden">
          <SideNav />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

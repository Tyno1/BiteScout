"use client";

import SideNav from "@/components/ui/Dashboard/SideNav";
import { ReactNode, useState } from "react";
import TopNav from "@/components/ui/Dashboard/TopNav";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useNotifications } from "@/hooks/useNotification";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser();
  // const { unreadCount } = useNotifications({
  //   userId: userData?._id,
  //   token,
  // });

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const unreadCount = 1;
  // if (userData.restaurantCount < 1) {
  //   return (window.location.href = "/onboarding/roles");
  // }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      <TopNav
        onMenuClick={handleMenuClick}
        userName={user?.name || ""}
        unreadNotifications={unreadCount}
      />
      {/* mobile view */}
      <div
        className={`w-screen h-screen md:hidden fixed top-14 z-20 ${
          !isMenuOpen && "hidden"
        }`}
      >
        <SideNav setIsMenuOpen={setIsMenuOpen} />
      </div>
      {/* desktop view */}
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

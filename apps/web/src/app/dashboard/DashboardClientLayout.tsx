"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { RouteProtection, SideNav, TopNav } from "@/components/ui";
import { usePlatform } from "@/hooks";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export function DashboardClientLayout({ children, session }: DashboardClientLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isTablet } = usePlatform();

  return (
    <div className="flex flex-col h-screen w-screen relative">
      {isMenuOpen && (
        <div className="w-screen h-screen md:hidden fixed top-14 z-20">
          <SideNav setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}

      <div className="flex h-full w-full">
        <div className={`shrink-0 md:block hidden overflow-hidden ${isTablet ? "w-30" : "w-72"}`}>
          <SideNav />
        </div>

        <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {session?.user && (
            <TopNav
              onMenuClick={() => setIsMenuOpen((prev: boolean) => !prev)}
              user={session.user}
            />
          )}
          <div className="mt-14">
            <RouteProtection>{children}</RouteProtection>
          </div>
        </div>
      </div>
    </div>
  );
}

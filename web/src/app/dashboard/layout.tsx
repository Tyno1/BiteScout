"use client";

import SideNav from "@/components/ui/dashboard/SideNav";
import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TopNav } from "@/components/ui";
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import { Spinner } from "@/components/atoms";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { restaurantAccessList } = useRestaurantAccessStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // fix this check

  useEffect(() => {
    const isNotOwner =
      session?.user?.restaurantCount !== undefined &&
      session.user.restaurantCount < 1;
    const isNotAdmin =
      restaurantAccessList?.length > 0 &&
      restaurantAccessList.some((access) => access.status !== "approved");

    setIsLoading(true);
    if (isNotOwner || isNotAdmin) {
      setIsLoading(false);
      console.log("not ownwr", isNotOwner);
      console.log("not admin", isNotAdmin);
      console.log(restaurantAccessList);

      // window.location.href = "/onboarding/roles";
    }
    setIsLoading(false);
  }, [session?.user.restaurantCount, restaurantAccessList]);

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

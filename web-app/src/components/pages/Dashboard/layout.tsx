import { Outlet } from "react-router-dom";
import SideNav from "./components/general/SideNav";
import { useContext, useState } from "react";
import { UserContext } from "@/providers/userContext";
import TopNav from "./components/general/TopNav";
import { useNotifications } from "@/hooks/useNotification";

const Layout = () => {
  const { token, userData } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { unreadCount } = useNotifications({
    userId: userData?._id,
    token,
  });

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (userData.restaurantCount < 1) {
    return (window.location.href = "/onboarding/roles");
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      <TopNav
        onMenuClick={handleMenuClick}
        userName={userData.name}
        unreadNotifications={unreadCount}
      />
      {/* mobile view */}
      <div className={`w-screen h-screen md:hidden fixed top-14 z-20 ${!isMenuOpen && "hidden"}`}>
        <SideNav setIsMenuOpen={setIsMenuOpen} />
      </div>
      {/* desktop view */}
      <div className="flex h-full w-full fixed top-16">
        <div className="w-64 shrink-0 md:block hidden overflow-hidden">
          <SideNav />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import SideNav from "./components/general/SideNav";
import { useContext, useState } from "react";
import { UserContext } from "@/providers/userContext";
import TopNav from "./components/general/TopNav";
import { useNotifications } from "@/hooks/useNotification";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { token, userData } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { unreadCount } = useNotifications({
    userId: userData?._id,
    token,
  });
console.log(userData);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (userData.restaurantCount < 1) {
    return (window.location.href = "/onboarding/roles");
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <TopNav
        onMenuClick={handleMenuClick}
        userName={userData.name}
        unreadNotifications={unreadCount}
      />
      {/* mobile view */}
      <div className={`w-full ${!isMenuOpen && "hidden"}`}>
        <SideNav setIsMenuOpen={setIsMenuOpen} />
      </div>
      {/* desktop view */}
      <div className="flex h-screen w-screen">
        <div className="w-64 shrink-0 md:block hidden">
          <SideNav />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

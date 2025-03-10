import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "./components/sideNav/SideNav";
import { useContext } from "react";
import { UserContext } from "@/providers/userContext";

const Layout = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  if (userData.restaurantCount < 1) {
   return window.location.href = "/onboarding/roles"
  }

  return (
    <div className="h-[screen] w-screen grid grid-cols-[20%_80%] gap-0 fixed">
      <SideNav />
      <div className="w-full h-[100vh] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

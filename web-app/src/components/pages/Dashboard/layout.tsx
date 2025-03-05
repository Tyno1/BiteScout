import { Outlet } from "react-router";
import SideNav from "./components/sideNav/SideNav";

const Layout = () => {

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

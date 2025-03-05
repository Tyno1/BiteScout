import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Home,
  UtensilsCrossed,
  Star,
  AudioLines,
  Settings,
  ChefHat,
  Users,
  UserCog,
  CookingPot,
  BellDot,
  ChartNoAxesCombined,
  House,
  LogOut,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

interface NavItemProps {
  icon: React.ReactElement;
  text: string;
  path?: string;
  HandleNav?: (navName: string) => void;
}

const NavItem = ({ icon, text, path, HandleNav }: NavItemProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = path ? pathname === path : false;
  const { logout } = useAuth0();

  return (
    <li className="w-full">
      <button
        onClick={() =>
          text === "Logout"
            ? logout()
            : HandleNav && HandleNav(path ? path : "/")
        }
        className={`
          flex items-center 
          px-2 py-4 rounded-md 
          cursor-pointer 
          transition-colors w-full
          ${isActive ? "bg-red text-white" : "hover:bg-gray-100 text-gray-700"}
        `}
      >
        <span className="mr-3 w-5 h-5">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </button>
    </li>
  );
};

const SideNav = () => {
  const navigate = useNavigate();

  const NavTo = (route: string) => {
    navigate(route);
  };

  //   handle navigation
  const HandleNav = (navName: string) => {
    NavTo(navName);
  };

  return (
    <div className="h-[100vh] w-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <ChefHat className="mr-2 text-red-600" />
        <h2 className="text-xl font-bold text-gray-800">FoodVibe CRM</h2>
      </div>

      <nav className="flex-1 p-4 w-full h-full">
        <ul className="w-full h-screen">
          <NavItem
            HandleNav={HandleNav}
            icon={<Home />}
            text="Dashboard"
            path="/dashboard"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<UtensilsCrossed />}
            text="Restaurant Profile"
            path="/dashboard/restaurant-profile"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<CookingPot />}
            text="Food Catalogue"
            path="/dashboard/food-catalogue"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<UserCog />}
            text="User Management"
            path="/dashboard/user-management"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<BellDot />}
            text="Notifications"
            path="/dashboard/notifications"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<ChartNoAxesCombined />}
            text="Analytics"
            path="/dashboard/analytics"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<Star />}
            text="Reviews"
            path="/dashboard/reviews"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<AudioLines />}
            text="AI Audio Reviews"
            path="/dashboard/ai-audio"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<Users />}
            text="Customer Insights"
            path="/dashboard/customer-insight"
          />
          <li className="border-t border-gray-200 w-full mt-auto">
            <ul className="w-full">
              <NavItem
                HandleNav={HandleNav}
                icon={<Settings />}
                text="Settings"
                path="/dashboard/settings"
              />
              <NavItem
                HandleNav={HandleNav}
                icon={<House />}
                text="Home"
                path="/"
              />
              <NavItem icon={<LogOut />} text="Logout" />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

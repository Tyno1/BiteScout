"use client";

import React, { useRef } from "react";
import {
  Home,
  UtensilsCrossed,
  Star,
  AudioLines,
  Settings,
  ChefHat,
  Users,
  Mic,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface NavItemProps {
  icon: React.ReactElement;
  text: string;
  path?: string;
  active?: boolean;
  HandleNav?: (navName: string) => void;
}

const NavItem = ({
  icon,
  text,
  path,
  active = false,
  HandleNav,
}: NavItemProps) => {
  return (
    <li className="w-full">
      <button
        onClick={() => HandleNav && HandleNav(path ? path : "/")}
        className={`
          flex items-center 
          p-2 rounded-md 
          cursor-pointer 
          transition-colors w-full
          ${
            active
              ? "bg-red-50 text-red-600"
              : "hover:bg-gray-100 text-gray-700"
          }
        `}
      >
        {React.cloneElement(icon, {
          className: "mr-3 w-5 h-5",
        })}
        <span className="text-sm font-medium">{text}</span>
      </button>
    </li>
  );
};

const SideNav = () => {
  const router = useRouter();
  const HandleNav = (navName: string) => {
    router.push(navName);
  };
  return (
    <div className="h-screen w-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <ChefHat className="mr-2 text-red-600" />
        <h2 className="text-xl font-bold text-gray-800">FoodVibe CRM</h2>
      </div>

      <nav className="flex-1 p-4 w-full">
        <ul className="space-y-2 w-full">
          <NavItem
            HandleNav={HandleNav}
            icon={<Home />}
            text="Dashboard"
            path="/dashboard"
          />
          <NavItem
            HandleNav={HandleNav}
            icon={<UtensilsCrossed />}
            text="Menu Management"
            path="/dashboard/menu-management"
          />
          <NavItem icon={<Star />} text="Reviews" path="/dashboard/reviews" />
          <NavItem
            icon={<AudioLines />}
            text="AI Audio Reviews"
            path="/dashboard/ai-reviews"
          />
          <NavItem
            icon={<Users />}
            text="Customer Insights"
            path="/dashboard/customer-insight"
          />
          <li className="border-t border-gray-200 w-full mt-auto">
            <ul className="w-full">
              <NavItem
                icon={<Settings />}
                text="Settings"
                path="/dashboard/settings"
              />
              <NavItem icon={<Settings />} text="Leave CRM" path="/" />
              <NavItem icon={<Settings />} text="Logout" />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

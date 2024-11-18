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
import { useRouter } from "next/router";

const NavItem = ({ icon, text, active = false }: any) => {
  const router = useRouter();
  const HandleNav = () => {
    router.push(router.pathname === "/dashboard" ? "/" : "/dashboard");
  };
  return (
    <li className="w-full">
      <button
        onClick={HandleNav}
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
  return (
    <div className="h-screen w-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <ChefHat className="mr-2 text-red-600" />
        <h2 className="text-xl font-bold text-gray-800">FoodVibe CRM</h2>
      </div>

      <nav className="flex-1 p-4 w-full">
        <ul className="space-y-2 w-full">
          <NavItem icon={<Home />} text="Dashboard" />
          <NavItem icon={<UtensilsCrossed />} text="Menu Management" />
          <NavItem icon={<Star />} text="Reviews" />
          <NavItem icon={<AudioLines />} text="AI Audio Reviews" />
          <NavItem icon={<Mic />} text="Review Recording" />
          <NavItem icon={<Users />} text="Customer Insights" />
          <li className="border-t border-gray-200 w-full mt-auto">
            <ul className="w-full">
              <NavItem icon={<Settings />} text="Settings" />
              <NavItem icon={<Settings />} text="Leave CRM" />
              <NavItem icon={<Settings />} text="Logout" />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

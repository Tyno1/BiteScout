"use client"

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

type NavItemProps = {
  icon: React.ReactElement;
  text: string;
  path?: string;
  handleNav?: (navName: string) => void;
};

export function NavItem({ icon, text, path, handleNav }: NavItemProps) {
  const pathname = usePathname();

  const isActive = path ? pathname === path : false;

  return (
    <li className="w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          if (text === "Logout") {
            signOut({ callbackUrl: "/" });
          } else {
            handleNav && handleNav(path ? path : "/");
          }
        }}
        className={`
          flex items-center 
          px-2 py-4
          cursor-pointer 
          transition-colors w-full
          focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 focus:ring-rounded-lg
          ${
            isActive
              ? "bg-orange-600 border-1 border-orange-600 text-white rounded-lg"
              : "hover:bg-orange-500/20 text-gray-900 rounded-lg"
          }
        `}
      >
        <span className="mr-4 w-5 h-5">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </button>
    </li>
  );
}

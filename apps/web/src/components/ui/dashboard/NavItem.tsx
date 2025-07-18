"use client";

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

  const isActive = path
    ? path !== "/dashboard"
      ? pathname === path || pathname.startsWith(`${path}/`)
      : pathname === path
    : false;

  return (
    <li className="w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          if (text === "Logout") {
            signOut({ callbackUrl: "/" });
          } else {
            if (handleNav) handleNav(path ? path : "/");
          }
        }}
        className={`
          flex items-center 
          px-2 py-3
          transition-colors w-full
          focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 focus:ring-rounded-lg
          ${
            isActive
              ? "bg-primary/10 border-1 border-primary text-primary rounded-lg"
              : "hover:bg-primary/20 text-gray-900 rounded-lg"
          }
        `}
      >
        <span className="mr-4 w-4 h-4">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </button>
    </li>
  );
}

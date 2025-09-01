"use client";

import { Button } from "@/components/atoms";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import type React from "react";

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
      <Button
        type="button"
        fullWidth
        size="sm"
        variant={isActive ? "plain" : "plain"}
        color={isActive ? "primary" : "neutral"}
        onClick={() => {
          if (text === "Logout") {
            signOut({ redirectTo: "/" });
          } else {
            if (handleNav) handleNav(path ? path : "/");
          }
        }}
        className={`items-start flex justify-start  ${isActive ? "font-bold" : "font-normal"}`}
        IconBefore={icon}
        text={text}
      />
    </li>
  );
}

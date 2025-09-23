"use client";

import { Button, IconButton } from "@/components/atoms";
import { usePlatform } from "@/hooks";

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
  const { isTablet } = usePlatform();

  const isActive = path
    ? path !== "/dashboard"
      ? pathname === path || pathname.startsWith(`${path}/`)
      : pathname === path
    : false;

  const handleClick = () => {
    if (text === "Logout") {
      signOut({ redirectTo: "/" });
    } else {
      if (handleNav) handleNav(path ? path : "/");
    }
  };

  return (
    <li className="w-full flex justify-center">
      {isTablet ? (
        <IconButton
          icon={icon}
          variant={isActive ? "plain" : "plain"}
          color={isActive ? "primary" : "neutral"}
          size="sm"
          onClick={handleClick}
          ariaLabel={text}
          className={`${isActive ? "font-bold" : "font-normal"}`}
        />
      ) : (
        <Button
          type="button"
          fullWidth
          size="sm"
          variant={isActive ? "plain" : "plain"}
          color={isActive ? "primary" : "neutral"}
          onClick={handleClick}
          className={`items-start flex justify-start ${isActive ? "font-bold" : "font-normal"}`}
          IconBefore={icon}
          text={text}
        />
      )}
    </li>
  );
}

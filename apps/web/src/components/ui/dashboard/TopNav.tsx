"use client";

import { IconButton, Input } from "@/components/atoms";
import { Bell, ChefHat, Menu } from "lucide-react";
import { NotificationBadge } from "@/components/atoms/badges";
import { User } from "@/types";
import Image from "next/image";

type TopNavProps = {
  onMenuClick: () => void;
  user: User;
};

export function TopNav({ onMenuClick, user }: TopNavProps) {
  return (
    <div className="fixed top-0 z-30 flex h-16 w-full items-center border-b border-gray-300 bg-white px-4 shadow-sm">
      {/* Conditionally rendered hamburger Menu */}
      <IconButton
        icon={<Menu />}
        variant="plain"
        onClick={onMenuClick}
        className="md:hidden"
      />

      <div className="flex w-full items-center justify-between">
        {/* Left side - Logo and brand name */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <ChefHat size={40} className="mr-2 text-orange-900" />
          <h2 className="text-xl font-bold text-black">BiteScout</h2>
        </div>

        {/* Middle - Search bar */}
        <div className="hidden md:block max-w-md w-full mx-4">
          <Input
            name="navSearch"
            placeholder="search"
            type="text"
            id="navbar-search"
            label="Navbar Search"
            fullWidth
            outlineType="round"
          />
        </div>

        {/* Right side - Notifications and profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            className="p-2 relative rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Notifications"
          >
            <Bell />
            <NotificationBadge userId={user?._id} />
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={user?.image || "/placeholder.svg"}
              alt={user?.name || "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
            />
            <div className="hidden md:flex flex-col items-start">
              <span className="hidden md:inline-block text-sm">
                {user?.name}
              </span>
              
               <span className="hidden md:inline-block text-xs text-primary font-bold rounded-full">
              {user?.restaurantCount && user.restaurantCount >= 1
                ? "Owner"
                : "User"}
            </span>
            </div>
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 dark:text-gray-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

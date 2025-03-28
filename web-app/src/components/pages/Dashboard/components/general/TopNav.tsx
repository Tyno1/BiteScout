"use client";

import IconButton from "@/components/atoms/buttons/IconButton";
import Input from "@/components/atoms/inputs/Input";
import { Bell, ChefHat, Menu } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
  userName?: string;
  userImage?: string;
  unreadNotifications?: number;
}

const TopNav = ({
  onMenuClick,
  userName,
  userImage = "/placeholder.svg?height=32&width=32",
  unreadNotifications,
}: TopNavProps) => {
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
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadNotifications}
            </span>
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={userImage || "/placeholder.svg"}
              alt={userName}
              className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
            />
            <span className="hidden md:inline-block text-sm">
              {userName}
            </span>
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
};

export default TopNav;

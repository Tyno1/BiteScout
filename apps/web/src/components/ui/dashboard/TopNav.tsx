"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { IconButton } from "@/components/atoms";
import { NotificationBadge } from "@/components/atoms/Badges";
import type { User } from "@/types";
import { ThemeToggle } from "../ThemeToggle";

type TopNavProps = {
  onMenuClick: () => void;
  user: User;
};

export function TopNav({ onMenuClick, user }: TopNavProps) {
  return (
    <div className="fixed top-0 left-0 md:left-72 right-0 z-30 flex h-14 items-center border-b border-foreground/10 bg-background backdrop-blur-sm px-4">
      <div className="flex w-full items-center justify-between">
        {/* Left - Menu and Logo */}
        <div className="flex items-center gap-4">
          <IconButton
            icon={<Menu size={18} />}
            variant="plain"
            onClick={onMenuClick}
            className="md:hidden"
            ariaLabel="Toggle menu"
          />

          {/* Logo - only on mobile */}
          <div className="md:hidden">
            <Image src="/logo.png" alt="Bite Scout" width={70} height={20} className="h-5 w-auto" />
          </div>
        </div>

        {/* Right - Essential actions only */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-600" />
            <NotificationBadge userId={user?._id} />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            <Image
              src={user?.image || "/placeholder.svg"}
              alt={user?.name || "User"}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover ring-2 ring-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

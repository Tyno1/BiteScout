"use client";

import { NavItem } from "@/components/ui";
import {
  AudioLines,
  BellDot,
  ChartNoAxesCombined,
  ChefHat,
  CookingPot,
  Home,
  House,
  Images,
  LogOut,
  Settings,
  Star,
  UserCog,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { AccessManager } from "../general";

interface SideNavProp {
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideNav({ setIsMenuOpen }: SideNavProp) {
  const router = useRouter();

  //   handle navigation
  const handleNav = (navName: string) => {
    router.push(navName);
    if (setIsMenuOpen) setIsMenuOpen(false);
  };

  return (
    <div className="h-[100vh] w-full bg-background border-r border-foreground/10 flex flex-col">
      <div className="p-6 items-center h-full mb-2 hidden md:flex">
        <ChefHat size={30} className="mr-2 text-primary" />
        <h2 className="text-xl font-bold text-primary">BiteScout</h2>
      </div>
      <nav className="flex-1 p-4 w-full h-full">
        <ul className="w-full h-screen space-y-1">
          <NavItem
            handleNav={handleNav}
            icon={<Home />}
            text="Dashboard"
            path="/dashboard"
          />
          <NavItem
            handleNav={handleNav}
            icon={<UtensilsCrossed />}
            text="Restaurant Profile"
            path="/dashboard/restaurant-profile"
          />
          <NavItem
            handleNav={handleNav}
            icon={<CookingPot />}
            text="Food Catalogue"
            path="/dashboard/food-catalogue"
          />
          <NavItem
            handleNav={handleNav}
            icon={<Images />}
            text="Gallery"
            path="/dashboard/gallery"
          />
          <NavItem
            handleNav={handleNav}
            icon={<UserCog />}
            text="User Management"
            path="/dashboard/user-management"
          />

          <AccessManager roles={["root", "admin"]}>
            <NavItem
              handleNav={handleNav}
              icon={<UserCog />}
              text="Team Management"
              path="/dashboard/team-management"
            />
          </AccessManager>

          <NavItem
            handleNav={handleNav}
            icon={<BellDot />}
            text="Notifications"
            path="/dashboard/notifications"
          />
          <NavItem
            handleNav={handleNav}
            icon={<ChartNoAxesCombined />}
            text="Analytics"
            path="/dashboard/analytics"
          />
          <NavItem
            handleNav={handleNav}
            icon={<Star />}
            text="Reviews"
            path="/dashboard/reviews"
          />
          <NavItem
            handleNav={handleNav}
            icon={<AudioLines />}
            text="AI Audio Reviews"
            path="/dashboard/ai-audio"
          />
          <NavItem
            handleNav={handleNav}
            icon={<Users />}
            text="Customer Insights"
            path="/dashboard/customer-insight"
          />
          <li className="border-t border-foreground/10 w-full mt-auto">
            <ul className="w-full">
              <NavItem
                handleNav={handleNav}
                icon={<Settings />}
                text="Settings"
                path="/dashboard/settings"
              />
              <NavItem
                handleNav={handleNav}
                icon={<House />}
                text="Home"
                path="/"
              />
              <NavItem handleNav={handleNav} icon={<LogOut />} text="Logout" />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

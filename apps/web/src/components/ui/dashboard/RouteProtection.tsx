"use client";

import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface RouteProtectionProps {
  children: React.ReactNode;
}

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { restaurantData, isOwner } = useRestaurantAccess();

  const currentRestaurantId =
    searchParams.get("restaurantId") || searchParams.get("id");

  // Get the default restaurant ID for this user
  const defaultRestaurantId =
    isOwner && restaurantData?._id ? restaurantData._id : null;

  useEffect(() => {
    // Check if this is a dashboard route
    if (pathname.startsWith("/dashboard")) {
      if (!currentRestaurantId) {
        if (defaultRestaurantId) {
          const newUrl = `${pathname}?restaurantId=${defaultRestaurantId}`;

          router.replace(newUrl);
        } else {
          // No restaurant ID available - redirect to unauthorized
          console.warn("No restaurant ID available for user");
          router.replace("/dashboard/unauthorized");
        }
      }
    }
  }, [pathname, currentRestaurantId, defaultRestaurantId, router]);

  return <>{children}</>;
};

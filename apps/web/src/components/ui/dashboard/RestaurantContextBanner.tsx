"use client";

import { Building2 } from "lucide-react";
import { Card } from "@/components/organisms/Card";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";

export const RestaurantContextBanner = () => {
  const { restaurantData } = useRestaurantAccess();

  // Show banner when user has restaurant context (either as owner or has access)
  if (!restaurantData?._id) {
    return null;
  }

  return (
    <Card padding="sm" shadow="sm" className="border-border">
      <div className="flex items-center space-x-2">
        <Building2 size={14} className="text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-card-foreground truncate">
            {restaurantData?.name || restaurantData?._id}
          </p>
          <p className="text-xs text-card-foreground truncate">
            Restaurant ID: {restaurantData?._id}
          </p>
        </div>
      </div>
    </Card>
  );
};

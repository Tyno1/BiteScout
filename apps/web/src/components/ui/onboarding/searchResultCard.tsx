"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { RestaurantAccess } from "shared/types/api/schemas";
import { Button } from "@/components/atoms";

type RestaurantData = {
  _id: string;
  name: string;
};

type CardProp = {
  data: RestaurantData;
  handleRestaurantSelect: (restaurantId: string) => void;
  restaurantAccessList: RestaurantAccess[];
  refetchUserAccess: () => void;
};

// Render search button based on access status
const ContactAdmin = () => (
  <div className="mt-3 p-2 bg-blue-50 rounded-md border border-blue-100 flex items-start gap-1">
    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
    <p className="text-xs text-blue-700">
      Contact your restaurant admin to activate your access
    </p>
  </div>
);

export function SearchResultCard({
  data,
  handleRestaurantSelect,
  restaurantAccessList,
  refetchUserAccess,
}: CardProp) {
  const [accessStatus, setAccessStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleRefresh = () => {
    refetchUserAccess();
    if (accessStatus === "approved") {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (!Array.isArray(restaurantAccessList) || !data?._id) {
      return;
    }

    const restaurantAccess = restaurantAccessList.find(
      (access) => access.restaurantId === data._id
    );

    if (!restaurantAccess) {
      setAccessStatus(null);
      return;
    }

    switch (restaurantAccess?.status) {
      case "approved":
        setAccessStatus("approved");
        router.push("/dashboard");
        break;
      case "pending":
        setAccessStatus("pending");
        break;
      case "suspended":
        setAccessStatus("suspended");
        break;
      case "innactive":
        setAccessStatus("innactive");
        break;
      default:
        setAccessStatus(null);
        break;
    }
  }, [restaurantAccessList, data?._id, router]);

  // Render button based on access status
  const renderActionButton = () => {
    switch (accessStatus) {
      case "pending":
        return (
          <div className="flex flex-col justify-end gap-2">
            <Button
              size="xs"
              disabled
              variant="solid"
              type="button"
              text="Access Pending"
              className="cursor-not-allowed"
            />
            <Button
              size="xs"
              onClick={handleRefresh}
              variant="glass"
              color="neutral"
              type="button"
              text="Refresh"
            />
            <ContactAdmin />
          </div>
        );

      case "approved":
        return (
          <div className="flex flex-col justify-end gap-2">
            <Button
              size="xs"
              variant="solid"
              type="button"
              text="Access Approved"
              disabled
              className="cursor-not-allowed"
            />
            <Button
              size="xs"
              onClick={handleRefresh}
              variant="glass"
              color="neutral"
              type="button"
              text="Refresh"
            />
          </div>
        );

      case "suspended":
        return (
          <div className="flex flex-col justify-end gap-2">
            <Button
              size="xs"
              disabled
              variant="solid"
              type="button"
              text="Access Suspended"
              className="cursor-not-allowed"
            />

            <Button
              size="xs"
              onClick={handleRefresh}
              variant="glass"
              color="neutral"
              type="button"
              text="Refresh"
            />

            <ContactAdmin />
          </div>
        );

      case "innactive":
        return (
          <div className="flex flex-col justify-end gap-2">
            <Button
              size="xs"
              disabled
              className="cursor-not-allowed"
              variant="solid"
              type="button"
              text="Access Deactivated"
            />
            <Button
              size="xs"
              onClick={handleRefresh}
              variant="glass"
              color="neutral"
              type="button"
              text="Refresh"
            />
          </div>
        );
      case null:
        return (
          <div className="flex flex-col justify-end gap-2">
            <Button
              size="xs"
              onClick={() => data._id && handleRestaurantSelect(data._id)}
              variant="solid"
              type="button"
              text="Request Access"
            />
            <Button
              size="xs"
              onClick={handleRefresh}
              variant="glass"
              color="neutral"
              type="button"
              text="Refresh"
            />
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="mb-2 sm:mb-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {data?.name || "Restaurant"}
        </p>
      </div>
      <div className="mb-2 sm:mb-0 w-[30%]">{renderActionButton()}</div>
    </div>
  );
}

"use client";

import { Badge, IconButton } from "@/components/atoms";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { Ban, CheckCircle, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { RestaurantAccess } from "shared/types/api/schemas";

export default function TeamManagement() {
  const router = useRouter();
  const { 
    restaurantAccessList, 
    deleteAccess, 
    grantAccess, 
    suspendAccess,
    restaurantData
  } = useRestaurantAccess();

  // ✅ REMOVED: Redundant restaurant access validation
  // Middleware and RouteProtection already handle this validation
  // No need for client-side useEffect validation

  const handleStatusChange = async (
    accessId: string,
    status: RestaurantAccess["status"]
  ) => {
    try {
      switch (status) {
        // case where button is clicked to approve access
        case "approved":
          grantAccess(accessId);
          break;
        // case where button is clicked to suspend access
        case "suspended":
          suspendAccess(accessId);
          break;
        // case where button is clicked to delete access
        case "innactive":
          deleteAccess(accessId);
          break;
      }

      // React Query handles cache invalidation automatically
    } catch (error) {
      console.error("Failed to update access status", error);
    }
  };

  const getStatusBadge = (status: RestaurantAccess["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge color="success" variant="solid" size="xs">
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge color="secondary" variant="solid" size="xs">
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge color="primary" variant="solid" size="xs">
            Pending
          </Badge>
        );
      case "innactive":
        return (
          <Badge color="danger" variant="solid" size="xs">
            Inactive
          </Badge>
        );

      default:
        return (
          <Badge color="neutral" variant="solid" size="xs">
            {status}
          </Badge>
        );
    }
  };

  return (
    <main className="w-full mx-auto px-10 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
      </div>

      {restaurantAccessList && (
        <div className="mb-4 p-4 bg-card shadow rounded-md">
          <h2 className="font-medium text-card-foreground">
            Managing team for:{" "}
            <span className="font-bold">
              {typeof restaurantAccessList[0]?.restaurantId === "object"
                ? (restaurantAccessList[0]?.restaurantId as { name: string })
                    ?.name
                : ""}
            </span>
          </h2>
        </div>
      )}

      {restaurantAccessList.length === 0 ? (
        <div className="text-center py-12 bg-card text-card-foreground rounded-lg shadow">
          <User className="mx-auto h-12 w-12 " />
          <h3 className="mt-2 text-lg font-medium text-card-foreground">
            No team members yet
          </h3>
          <p className="mt-1 text-sm">
            Team access will appear here once users have requested access.
          </p>
        </div>
      ) : (
        <div className="bg-card text-card-foreground shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {restaurantAccessList.map((access) => {
              const user =
                typeof access.userId === "object"
                  ? access.userId
                  : { name: "Unknown", email: "Unknown" };

              return (
                <li key={access?._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2x">
                      <h2 className="text-lg font-semibold">{user?.name}</h2>
                      <p className="text-sm">{user?.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(access?.status)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {access.status !== "approved" && (
                        <IconButton
                          icon={<CheckCircle size={18} />}
                          variant="plain"
                          color="success"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(access?._id ?? "", "approved")
                          }
                          ariaLabel="Activate access"
                        />
                      )}
                      {access.status !== "suspended" && (
                        <IconButton
                          icon={<Ban size={18} />}
                          variant="plain"
                          color="secondary"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(access._id ?? "", "suspended")
                          }
                          ariaLabel="Suspend access"
                        />
                      )}
                      <IconButton
                        icon={<Trash2 size={18} />}
                        variant="plain"
                        color="danger"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(access._id ?? "", "innactive")
                        }
                        ariaLabel="Remove access"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  );
}

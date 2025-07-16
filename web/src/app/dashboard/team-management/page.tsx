"use client";

import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import type { RestaurantAccess } from "@shared/types/api/schemas";
import { Ban, CheckCircle, Trash2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function TeamManagement() {
  const { data: session } = useSession();
  const {
    restaurantAccessList,
    getRestaurantAccessListByOwnerId,
    resetAccess,
    deleteAccess,
    grantAccess,
    suspendAccess,
  } = useRestaurantAccessStore();

  useEffect(() => {
    const userId = session?.user?._id;
    const isOwner =
      session?.user?.restaurantCount && session.user.restaurantCount >= 1;
    if (userId && isOwner) {
      const fetchRestaurantAccessList = async () => {
        await getRestaurantAccessListByOwnerId(userId);
      };
      fetchRestaurantAccessList();
    }

    // Reset access only when the component unmounts
    return () => {
      resetAccess();
    };
  }, [
    session?.user?._id,
    session?.user?.restaurantCount,
    getRestaurantAccessListByOwnerId,
  ]);

  const handleStatusChange = async (accessId: string, status: RestaurantAccess["status"]) => {
    try {
      switch (status) {
        // case where button is clicked to approve access
        case "approved":
          await grantAccess(accessId);
          break;
        // case where button is clicked to suspend access
        case "suspended":
          await suspendAccess(accessId);
          break;
        // case where button is clicked to delete access
        case "innactive":
          await deleteAccess(accessId);
          break;
      }

      await getRestaurantAccessListByOwnerId(session?.user?._id ?? "");
    } catch (error) {
      console.error("Failed to update access status", error);
    }
  };

  const getStatusBadge = (status: RestaurantAccess["status"]) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Suspended
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Pending
          </span>
        );
      case "innactive":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Inactive
          </span>
        );

      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <main className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Team Management</h1>
          </div>

          {restaurantAccessList && (
            <div className="mb-4 p-4 bg-white shadow rounded-md">
              <h2 className="font-medium text-gray-700">
                Managing team for:{" "}
                <span className="font-bold text-gray-900">
                  {typeof restaurantAccessList[0]?.restaurantId === "object"
                    ? restaurantAccessList[0]?.restaurantId?.name
                    : ""}
                </span>
              </h2>
            </div>
          )}

          {restaurantAccessList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No team members yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Team access will appear here once users have requested access.
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {restaurantAccessList.map((access) => {
                  const user =
                    typeof access.userId === "object"
                      ? access.userId
                      : { name: "Unknown", email: "Unknown" };

                  return (
                    <li key={access?._id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold">
                            {user?.name}
                          </h2>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusBadge(access?.status)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {access.status !== "approved" && (
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  access?._id ?? "",
                                  "approved"
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition"
                              title="Activate access"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {access.status !== "suspended" && (
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  access._id ?? "",
                                  "suspended"
                                )
                              }
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition"
                              title="Suspend access"
                            >
                              <Ban className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleStatusChange(access._id ?? "", "innactive")
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                            title="Remove access"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

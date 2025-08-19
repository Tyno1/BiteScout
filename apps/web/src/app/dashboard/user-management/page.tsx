"use client";

import { Button } from "@/components/atoms";
import { useRestaurantAccess } from "@/hooks";
import { Plus } from "lucide-react";
import type React from "react";

const UserManagement = () => {
  const { restaurantData } = useRestaurantAccess();

  // Simple loading state - if we get here, middleware already validated access
  if (!restaurantData?._id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-foreground">Loading user management...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-foreground text-sm mt-2">
              Manage your restaurant&apos;s users and their access permissions
            </p>
          </div>
          <Button
            text="Add User"
            variant="solid"
            color="primary"
            size="sm"
            IconBefore={<Plus size={16} />}
            // onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
    </main>
  );
};

export default UserManagement;

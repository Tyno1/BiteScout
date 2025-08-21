"use client";

import { Button } from "@/components/atoms";
import { useRestaurantAccess, useUsers } from "@/hooks";
import { Plus } from "lucide-react";
import type React from "react";

const UserManagement = () => {
  const { restaurantData } = useRestaurantAccess();
  const { data, isLoading } = useUsers({ 
    restaurantId: restaurantData?._id,
    page: 1,
    limit: 20 
  }, {
    enabled: !!restaurantData?._id // Only fetch when we have a restaurant ID
  });

  console.log(data?.pagination.totalPages);

  console.log(data?.users);

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

      {/* User List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : data?.users && data.users.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Users ({data.users.length})
          </h2>
          <div className="grid gap-4">
            {data.users.map((user) => (
              <div key={user._id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'approved' ? 'bg-green-100 text-green-800' :
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Access ID: {user.accessId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found for this restaurant.</p>
        </div>
      )}
    </main>
  );
};

export default UserManagement;

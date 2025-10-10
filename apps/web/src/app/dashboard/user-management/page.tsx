"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms";
import { useRestaurantAccess, useUsers } from "@/hooks";

const UserList = dynamic(
  () =>
    import("@/components/ui/dashboard/user-management").then((mod) => ({
      default: mod.UserList,
    })),
  {
    loading: () => (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    ),
  }
);

const UserManagement = () => {
  const { restaurantData } = useRestaurantAccess();
  const { data, isLoading } = useUsers(
    {
      restaurantId: restaurantData?._id,
      page: 1,
      limit: 20,
    },
    {
      enabled: !!restaurantData?._id,
    }
  );

  const router = useRouter();

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
        <div className="flex justify-between items-start mb-4  gap-4">
          <h1 className="text-2xl font-bold"> User Management</h1>

          <Button
            text="Add User"
            variant="solid"
            color="primary"
            size="sm"
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
        <UserList
          users={data.users}
          totalUsers={data.pagination?.totalUsers}
          onUserClick={(id: string) => {
            router.push(`/dashboard/user-management/${id}`);
          }}
          onUserDelete={() => {}}
          onUserEdit={() => {}}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found for this restaurant.</p>
        </div>
      )}
    </main>
  );
};

export default UserManagement;

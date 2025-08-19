"use client";

import { Button, Spinner } from "@/components/atoms";
import { useDeleteUser, useRestaurantAccess, useUpdateUser, useUsers } from "@/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { UpdateUserRequest } from "shared/types";

const UserManagement = () => {
	const { validateRestaurantAccess, restaurantData } = useRestaurantAccess();
	const router = useRouter();
	const [hasDataAccess, setHasDataAccess] = useState<boolean | null>(null);
	const users = useUsers();
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

	console.log(users);

	useEffect(() => {
		if (restaurantData?._id) {
			try {
				validateRestaurantAccess(restaurantData._id);
				setHasDataAccess(true);
			} catch (error) {
				console.error("Data access validation failed:", error);
				setHasDataAccess(false);
				router.push("/dashboard/unauthorized");
			}
		}
	}, [restaurantData?._id, validateRestaurantAccess, router]);

	if (hasDataAccess === null) {
		return <Spinner />;
	}

	if (hasDataAccess === false) {
		return null;
	}

	const handleUpdateUser = (userId: string, data: UpdateUserRequest) => {
    updateUser.mutate({ userId, data }, {
      onSuccess: () => {
        toast.success("User updated successfully");
      },
      onError: () => {
        toast.error("Failed to update user");
			},
		});
	};
  const handleDeleteUser = (userId: string) => {
    deleteUser.mutate(userId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
    });
  };

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

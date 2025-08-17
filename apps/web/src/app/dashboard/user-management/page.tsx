"use client";

import { Button } from "@/components/atoms";
import { useRestaurantAccess } from "@/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

const UserManagement = () => {
  const { validateRestaurantAccess, restaurantData} = useRestaurantAccess()
  const router = useRouter()


  useEffect(()=>{
    if(restaurantData?._id){
      try {
        validateRestaurantAccess(restaurantData._id)

      } catch (error) {
        console.error("Access validation failed:", error);
        router.push("/dashboard/unauthorized");
      }
    }
  },[restaurantData?._id, validateRestaurantAccess, router])
  



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

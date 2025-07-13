"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import image1 from "@/assets/hero/mgg-vitchakorn-DDn9I5V1ubE-unsplash.jpg";
import { useSession } from "next-auth/react";
import useRestaurantStore from "@/stores/restaurantStore";
import { RestaurantData } from "@/types/restaurantData";
import {
  BasicInformation,
  BusinessHours,
  ContactInformation,
  RestaurantProfileFeatures,
  RestaurantProfileHero,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/hooks/useRole";
import { useApprovedAccess } from "@/app/hooks/useApprovedAccess";

type BusinessHoursType = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

const DEFAULT_BUSINESS_HOURS: BusinessHoursType[] = [
  { day: "Monday", open: "09:00", close: "17:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
  { day: "Thursday", open: "09:00", close: "17:00", closed: false },
  { day: "Friday", open: "09:00", close: "17:00", closed: false },
  { day: "Saturday", open: "10:00", close: "15:00", closed: false },
  { day: "Sunday", open: "10:00", close: "15:00", closed: true },
];

export default function RestaurantProfile() {
  const router = useRouter();
  const {
    hasAccess,
    isLoading: accessLoading,
    restaurantId,
  } = useApprovedAccess();
  const { userRole, isLoading: roleLoading } = useRole();
  const { data: session } = useSession();

  const {
    getRestaurantByOwnerId,
    updateRestaurant,
    getRestaurantById,
    restaurantData,
    isLoading: restaurantLoading,
  } = useRestaurantStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<RestaurantData | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [newCuisine, setNewCuisine] = useState<string>("");
  const [businessHours, setBusinessHours] = useState<BusinessHoursType[]>(
    DEFAULT_BUSINESS_HOURS
  );

  // Use editableData when in edit mode, otherwise use restaurantData
  const displayData = isEditing ? editableData : restaurantData;

  // Memoize business hours to prevent unnecessary recalculations
  const mergedBusinessHours = useMemo(() => {
    if (!displayData?.businessHours || displayData.businessHours.length === 0) {
      return DEFAULT_BUSINESS_HOURS;
    }

    return DEFAULT_BUSINESS_HOURS.map((defaultHours) => {
      const existingHours = displayData.businessHours.find(
        (h: any) => h.day === defaultHours.day
      );
      return existingHours || defaultHours;
    });
  }, [displayData?.businessHours]);

  // Update business hours when displayData changes
  useEffect(() => {
    setBusinessHours(mergedBusinessHours);
  }, [mergedBusinessHours]);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Handle image upload logic here
      console.log("Image uploaded:", file);
    },
    []
  );

  const handleSave = useCallback(async () => {
    console.log("🚨 SAVE TRIGGERED!");
    console.log("Call stack:", new Error().stack);
    console.log("editableData:", editableData?._id);

    if (!editableData?._id) {
      console.error("No editable data or ID found");
      return;
    }
    try {
      const response = await updateRestaurant({
        data: editableData,
        id: editableData._id,
      });

      if (!response.success) {
        console.error("Failed to update restaurant:", response);
        return;
      }

      setIsEditing(false);
      setEditableData(null);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  }, [editableData, updateRestaurant]);

  const handleEdit = useCallback(() => {
    if (!restaurantData) return;

    setEditableData({
      ...restaurantData,
      businessHours: businessHours,
    });
    setIsEditing(true);
  }, [restaurantData, businessHours]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditableData(null);
  }, []);

  const addFeature = useCallback(() => {
    const trimmedFeature = newFeature.trim();
    if (!trimmedFeature) return;

    setEditableData((prev) => {
      if (!prev || prev.features.includes(trimmedFeature)) return prev;
      return {
        ...prev,
        features: [...prev.features, trimmedFeature],
      };
    });
    setNewFeature("");
  }, [newFeature]); // Only depend on newFeature

  const removeFeature = useCallback((feature: string) => {
    setEditableData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        features: prev.features.filter((f) => f !== feature),
      };
    });
  }, []); // No dependencies needed

  const removeCuisine = useCallback((cuisine: string) => {
    setEditableData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cuisine: prev.cuisine.filter((c) => c !== cuisine),
      };
    });
  }, []); // No dependencies needed

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        addFeature();
      }
    },
    [addFeature]
  );

  const handleInputChange = useCallback(
    (field: keyof RestaurantData, value: any) => {
      setEditableData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [field]: value,
        };
      });
    },
    []
  );

  const handleBusinessHoursChange = useCallback(
    (index: number, field: keyof BusinessHoursType, value: any) => {
      setEditableData((prev) => {
        if (!prev?.businessHours) return prev;

        const newHours = [...prev.businessHours];
        newHours[index] = {
          ...newHours[index],
          [field]: value,
        };
        return {
          ...prev,
          businessHours: newHours,
        };
      });
    },
    []
  );

  // Effect for admin/root users
  useEffect(() => {
    if (!session?.user?._id || !userRole) return;
    if (userRole !== "root" && userRole !== "admin") return;
    // if (restaurantData) return; // Don't refetch if we have data

    const userId = session.user._id;
    getRestaurantByOwnerId(userId);
  }, [session?.user?._id, userRole]);

  // Effect for regular users with access
  useEffect(() => {
    if (!session?.user?._id || !userRole) return;
    if (userRole === "root" || userRole === "admin") return;
    if (accessLoading || !hasAccess || !restaurantId) return;
    if (restaurantData) return; // Don't refetch if we have data

    getRestaurantById(restaurantId);
  }, [session?.user?._id, hasAccess, restaurantId]);

  // Loading state
  if (restaurantLoading || accessLoading || roleLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading restaurant data...</div>
      </div>
    );
  }
  // No access state
  if (
    !accessLoading &&
    !roleLoading &&
    !hasAccess &&
    userRole !== "root" &&
    userRole !== "admin"
  ) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">
          You don't have access to any restaurant data.
        </div>
      </div>
    );
  }

  // No data state
  if (!displayData) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">No restaurant data found.</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <RestaurantProfileHero
        image1={image1}
        isEditing={isEditing}
        displayData={displayData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleImageUpload={handleImageUpload}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <BasicInformation
          removeCuisine={removeCuisine}
          isEditing={isEditing}
          newCuisine={newCuisine}
          setNewCuisine={setNewCuisine}
          editableData={editableData}
          setEditableData={setEditableData}
          displayData={displayData}
          handleInputChange={handleInputChange}
        />

        <ContactInformation
          isEditing={isEditing}
          displayData={displayData}
          handleInputChange={handleInputChange}
        />

        <BusinessHours
          businessHours={businessHours}
          isEditing={isEditing}
          handleBusinessHoursChange={handleBusinessHoursChange}
        />

        <RestaurantProfileFeatures
          isEditing={isEditing}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
          handleKeyPress={handleKeyPress}
          addFeature={addFeature}
          removeFeature={removeFeature}
          displayData={displayData}
        />

        {/* Status Messages for Screen Readers */}
        <div className="sr-only" role="status" aria-live="polite">
          {isEditing
            ? "You are in edit mode. Make your changes and click the save button to save them."
            : "View mode. Click the edit button to make changes."}
        </div>
      </div>
    </main>
  );
}

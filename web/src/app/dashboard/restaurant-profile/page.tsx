"use client";

import { useApprovedAccess } from "@/app/hooks/useApprovedAccess";
import { useRole } from "@/app/hooks/useRole";
import { BasicInformation } from "@/components/ui/dashboard/restaurant-profile/BasicInformation";
import { BusinessHours } from "@/components/ui/dashboard/restaurant-profile/BusinessHours";
import { ContactInformation } from "@/components/ui/dashboard/restaurant-profile/ContactInformation";
import { RestaurantProfileFeatures } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileFeatures";
import { RestaurantProfileHero } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileHero";
import useCuisineStore from "@/stores/cuisineStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { getMediaUrl } from "@/types/media";
import type {
  BusinessHour,
  Cuisine,
  Restaurant,
  RestaurantFeature,
} from "@shared/types/api/schemas";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_BUSINESS_HOURS: BusinessHour[] = [
  { day: "Monday", open: "09:00", close: "17:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
  { day: "Thursday", open: "09:00", close: "17:00", closed: false },
  { day: "Friday", open: "09:00", close: "17:00", closed: false },
  { day: "Saturday", open: "09:00", close: "17:00", closed: false },
  { day: "Sunday", open: "09:00", close: "17:00", closed: false },
];

export default function RestaurantProfile() {
  const { data: session } = useSession();
  const { userRole, isLoading: roleLoading } = useRole();
  const {
    hasAccess,
    restaurantId,
    isLoading: accessLoading,
  } = useApprovedAccess();
  const {
    restaurantData,
    isLoading: restaurantLoading,
    getRestaurantByOwnerId,
    getRestaurantById,
    updateRestaurant,
  } = useRestaurantStore();
  const { cuisines, getCuisines } = useCuisineStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<Restaurant | null>(null);
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>(
    DEFAULT_BUSINESS_HOURS
  );
  const [newFeature, setNewFeature] = useState<RestaurantFeature | null>(null);

  // Get the display data (either editable or current)
  const displayData = editableData || restaurantData;

  // Get the hero image from restaurant media
  const heroImage = getMediaUrl(
    restaurantData?.logo || restaurantData?.gallery,
    "/api/placeholder/1200/800"
  );

  // Merge business hours from restaurant data with defaults
  const mergedBusinessHours = useMemo(() => {
    return restaurantData?.businessHours?.length
      ? restaurantData.businessHours.map((hour: BusinessHour) => ({
          day: hour.day,
          open: hour.open,
          close: hour.close,
          closed: hour.closed,
        }))
      : DEFAULT_BUSINESS_HOURS;
  }, [restaurantData?.businessHours]);

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

  const addFeature = useCallback((feature: RestaurantFeature) => {
    setEditableData((prev) => {
      if (!prev) return prev;
      const currentFeatures = prev.features || [];
      if (currentFeatures.includes(feature)) return prev;
      return {
        ...prev,
        features: [...currentFeatures, feature],
      };
    });
  }, []);


  const addCuisine = useCallback((cuisine: Cuisine) => {
    setEditableData((prev) => {
      if (!prev) return prev;

      const currentCuisines = prev.cuisine || [];
      const cuisineExists = currentCuisines.some((c) =>
        typeof c === "string" ? c === cuisine._id : c._id === cuisine._id
      );

      if (cuisineExists) return prev;

      return {
        ...prev,
        cuisine: [...(prev.cuisine || []), cuisine],
      };
    });
  }, []);

  const removeCuisine = useCallback((cuisine: Cuisine) => {
    setEditableData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cuisine: prev.cuisine?.filter((c) => c !== cuisine),
      };
    });
  }, []); // No dependencies needed

  console.log(restaurantData);

  const handleInputChange = useCallback(
    (field: keyof Restaurant, value: Restaurant[keyof Restaurant]) => {
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
    (
      index: number,
      field: keyof BusinessHour,
      value: BusinessHour[keyof BusinessHour]
    ) => {
      setEditableData((prev) => {
        if (!prev?.businessHours) return prev;

        const oldHours = [...prev.businessHours];
        oldHours[index] = {
          ...oldHours[index],
          [field]: value,
        };
        return {
          ...prev,
          businessHours: oldHours,
        };
      });
    },
    []
  );

  useEffect(() => {
    getCuisines();
  }, [getCuisines]);

  // Effect for admin/root users
  useEffect(() => {
    if (!session?.user?._id || !userRole) return;
    if (userRole !== "root" && userRole !== "admin") return;
    // if (restaurantData) return; // Don't refetch if we have data

    const userId = session.user._id;
    getRestaurantByOwnerId(userId);
  }, [session?.user?._id, userRole, getRestaurantByOwnerId]);

  // Effect for regular users with access
  useEffect(() => {
    if (!session?.user?._id || !userRole) return;
    if (userRole === "root" || userRole === "admin") return;
    if (accessLoading || !hasAccess || !restaurantId) return;
    if (restaurantData) return; // Don't refetch if we have data

    getRestaurantById(restaurantId);
  }, [
    session?.user?._id,
    hasAccess,
    restaurantId,
    accessLoading,
    restaurantData,
    getRestaurantById,
    userRole,
  ]);

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
        image1={heroImage}
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
          addCuisine={addCuisine}
          cuisines={cuisines}
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
          businessHours={
            isEditing
              ? editableData?.businessHours || businessHours
              : businessHours
          }
          isEditing={isEditing}
          handleBusinessHoursChange={handleBusinessHoursChange}
        />

        <RestaurantProfileFeatures
          isEditing={isEditing}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
          addFeature={addFeature}
          displayData={displayData}
          handleInputChange={handleInputChange}
        />

        {/* Status Messages for Screen Readers */}
        <div className="sr-only" aria-live="polite">
          {isEditing
            ? "You are in edit mode. Make your changes and click the save button to save them."
            : "View mode. Click the edit button to make changes."}
        </div>
      </div>
    </main>
  );
}

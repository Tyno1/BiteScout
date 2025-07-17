"use client";

import { useApprovedAccess } from "@/app/hooks/useApprovedAccess";
import { useRole } from "@/app/hooks/useRole";
import { DEFAULT_BUSINESS_HOURS } from "@/app/onboarding/constants";
import { BasicInformation } from "@/components/ui/dashboard/restaurant-profile/BasicInformation";
import { BusinessHours } from "@/components/ui/dashboard/restaurant-profile/BusinessHours";
import { ContactInformation } from "@/components/ui/dashboard/restaurant-profile/ContactInformation";
import { DeliveryLinks } from "@/components/ui/dashboard/restaurant-profile/DeliveryLinks";
import { RestaurantProfileFeatures } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileFeatures";
import { RestaurantProfileHero } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileHero";
import useCuisineStore from "@/stores/cuisineStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { getMediaUrl } from "@/utils/mediaUtils";
import type {
  BusinessHour,
  Cuisine,
  DeliveryLink,
  Restaurant,
  RestaurantFeature,
} from "@shared/types/api/schemas";


import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";


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
    getDeliveryLinks,
    addDeliveryLink,
    deleteDeliveryLink,
    isLoading: deliveryLinksLoading,
  } = useRestaurantStore();
  const { cuisines, getCuisines } = useCuisineStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<Restaurant | null>(null);

  const [newFeature, setNewFeature] = useState<RestaurantFeature | null>(null);
  const [deliveryLinks, setDeliveryLinks] = useState<DeliveryLink[]>([]);

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
      await updateRestaurant({
        data: editableData,
        id: editableData._id,
      });

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
      businessHours: mergedBusinessHours,
    });
    setIsEditing(true);
  }, [restaurantData, mergedBusinessHours]);

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

  // Delivery links handlers
  const loadDeliveryLinks = useCallback(async () => {
    const currentRestaurantId = restaurantId || displayData?._id || "";
    if (!currentRestaurantId) return;
    try {
      const links = await getDeliveryLinks(currentRestaurantId);
      setDeliveryLinks(links);
    } catch {
      toast.error("Failed to load delivery links");
    }
  }, [restaurantId, displayData?._id, getDeliveryLinks]);

  const handleAddDeliveryLink = useCallback(async (data: Partial<DeliveryLink>) => {
    const currentRestaurantId = restaurantId || displayData?._id || "";
    if (!currentRestaurantId) return;
    try {
      await addDeliveryLink(currentRestaurantId, data);
      await loadDeliveryLinks();
      toast.success("Delivery link added");
    } catch {
      toast.error("Failed to add delivery link");
    }
  }, [restaurantId, displayData?._id, addDeliveryLink, loadDeliveryLinks]);

  const handleDeleteDeliveryLink = useCallback(async (id: string) => {
    const currentRestaurantId = restaurantId || displayData?._id || "";
    if (!currentRestaurantId) return;
    try {
      await deleteDeliveryLink(currentRestaurantId, id);
      await loadDeliveryLinks();
      toast.success("Delivery link removed");
    } catch {
      toast.error("Failed to remove delivery link");
    }
  }, [restaurantId, displayData?._id, deleteDeliveryLink, loadDeliveryLinks]);

  // Load delivery links when restaurant changes
  useEffect(() => {
    loadDeliveryLinks();
  }, [loadDeliveryLinks]);

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
          You don&apos;t have access to any restaurant data.
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
              ? editableData?.businessHours || mergedBusinessHours
              : mergedBusinessHours
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

         <DeliveryLinks
          isEditing={isEditing}
          restaurantId={restaurantId || displayData?._id || ""}
          links={deliveryLinks}
          isLoading={deliveryLinksLoading}
          onAdd={handleAddDeliveryLink}
          onDelete={handleDeleteDeliveryLink}
        />

        {/* Status Messages for Screen Readers */}
        <div className="sr-only" aria-live="polite">
          {isEditing
            ? "You are in edit mode. Make your changes and click the save button to save them."
            : "View mode. Click the edit button to make changes."}
        </div>
      </div>

      {/* Floating Mode Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${
          isEditing 
            ? "bg-primary/90 text-white" 
            : "bg-gray-100/80 text-gray-600"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            isEditing ? "bg-white" : "bg-gray-500"
          }`}></div>
          {isEditing ? "Edit" : "View"}
        </div>
      </div>

    
    </main>
  );
}

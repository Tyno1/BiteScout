"use client";

import { useRestaurantAccess } from "@/app/hooks/useRestaurantAccess";
import { DEFAULT_BUSINESS_HOURS } from "@/app/onboarding/constants";
import { Spinner } from "@/components/atoms";
import { BasicInformation } from "@/components/ui/dashboard/restaurant-profile/BasicInformation";
import { BusinessHours } from "@/components/ui/dashboard/restaurant-profile/BusinessHours";
import { ContactInformation } from "@/components/ui/dashboard/restaurant-profile/ContactInformation";
import { DeliveryLinks } from "@/components/ui/dashboard/restaurant-profile/DeliveryLinks";
import { RestaurantProfileFeatures } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileFeatures";
import { RestaurantProfileHero } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileHero";
import { getMediaUrl } from "@/utils/mediaUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { BusinessHour, Cuisine, DeliveryLink, Restaurant, RestaurantFeature } from "shared/types/api/schemas";

export default function RestaurantProfile() {
  const {
    restaurantData,
    session,
    cuisines,
    restaurantAccessList,
    isLoading,
    deliveryLinksLoading,
    isOwner,
    loadRestaurantData,
    getRestaurantListAccess,
    updateRestaurant,
    getDeliveryLinks,
    addDeliveryLink,
    deleteDeliveryLink,
    getCuisines,
  } = useRestaurantAccess();

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
  }, []);

  // Delivery links handlers
  const loadDeliveryLinks = useCallback(async () => {
    const currentRestaurantId = restaurantData?._id || "";
    if (!currentRestaurantId) return;
    try {
      const links = await getDeliveryLinks(currentRestaurantId);
      setDeliveryLinks(links);
    } catch {
      toast.error("Failed to load delivery links");
    }
  }, [restaurantData?._id, getDeliveryLinks]);

  const handleAddDeliveryLink = useCallback(async (data: Partial<DeliveryLink>) => {
    const currentRestaurantId = restaurantData?._id || "";
    if (!currentRestaurantId) return;
    try {
      await addDeliveryLink(currentRestaurantId, data);
      await loadDeliveryLinks();
      toast.success("Delivery link added");
    } catch {
      toast.error("Failed to add delivery link");
    }
  }, [restaurantData?._id, addDeliveryLink, loadDeliveryLinks]);

  const handleDeleteDeliveryLink = useCallback(async (linkId: string) => {
    const currentRestaurantId = restaurantData?._id || "";
    if (!currentRestaurantId) return;
    try {
      await deleteDeliveryLink(currentRestaurantId, linkId);
      await loadDeliveryLinks();
      toast.success("Delivery link deleted");
    } catch {
      toast.error("Failed to delete delivery link");
    }
  }, [restaurantData?._id, deleteDeliveryLink, loadDeliveryLinks]);

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

  // Load delivery links when restaurant changes
  useEffect(() => {
    if (restaurantData?._id) {
      loadDeliveryLinks();
    }
  }, [restaurantData?._id, loadDeliveryLinks]);

  // Load cuisines
  useEffect(() => {
    getCuisines();
  }, [getCuisines]);

  // Load restaurant access list for non-owners
  useEffect(() => {
    if (!session?.user?._id) return;
    getRestaurantListAccess(session.user._id);
  }, [session?.user?._id, getRestaurantListAccess]);

  // Load restaurant data using the flexible approach
  useEffect(() => {
    if (!session?.user?._id) return;
    if (restaurantData?._id) return; // Don't refetch if we have valid data

    loadRestaurantData();
  }, [session?.user?._id, loadRestaurantData, restaurantData?._id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Spinner />
          <div className="text-lg">Loading restaurant data...</div>
        </div>
      </div>
    );
  }

  // Handle different user scenarios
  if (!restaurantData?._id) {
    // Check if user has any approved restaurant access
    const hasApprovedAccess = restaurantAccessList.some(
      (access) => access.status === "approved"
    );

    if (isOwner) {
      return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-lg">No restaurant data found.</div>
            <div className="text-sm text-gray-600">Please contact support if you believe this is an error.</div>
          </div>
        </div>
      );
    }
    
    if (hasApprovedAccess) {
      return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Spinner />
            <div className="text-lg">Loading restaurant data...</div>
            <div className="text-sm text-gray-600">Please wait while we fetch your restaurant information.</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg">No restaurant access found.</div>
          <div className="text-sm text-gray-600">
            {isOwner 
              ? "This page is for restaurant owners to manage their restaurant profiles."
              : "You don't have access to any restaurants. Please contact your restaurant administrator."
            }
          </div>
        </div>
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
          restaurantId={restaurantData?._id || ""}
          links={deliveryLinks}
          isLoading={deliveryLinksLoading}
          onAdd={handleAddDeliveryLink}
          onDelete={handleDeleteDeliveryLink}
        />

        {/* Status Messages for Screen Readers */}
        {isLoading && (
          <div className="sr-only" aria-live="polite">
            Loading restaurant data...
          </div>
        )}
        {isEditing && (
          <div className="sr-only" aria-live="polite">
            Editing restaurant profile
          </div>
        )}
      </div>
    </main>
  );
}

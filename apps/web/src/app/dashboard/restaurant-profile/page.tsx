"use client";

import { DEFAULT_BUSINESS_HOURS } from "@/app/onboarding/constants";
import { Spinner } from "@/components/atoms";
import { BasicInformation } from "@/components/ui/dashboard/restaurant-profile/BasicInformation";
import { BusinessHours } from "@/components/ui/dashboard/restaurant-profile/BusinessHours";
import { ContactInformation } from "@/components/ui/dashboard/restaurant-profile/ContactInformation";
import { DeliveryLinks } from "@/components/ui/dashboard/restaurant-profile/DeliveryLinks";
import { RestaurantImageModal } from "@/components/ui/dashboard/restaurant-profile/RestaurantImageModal";
import { RestaurantProfileFeatures } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileFeatures";
import { RestaurantProfileHero } from "@/components/ui/dashboard/restaurant-profile/RestaurantProfileHero";
import { useMediaWithOptimizedUrl } from "@/hooks/media";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  BusinessHour,
  Cuisine,
  DeliveryLink,
  Restaurant,
  RestaurantFeature,
} from "shared/types/api/schemas";

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function RestaurantProfile() {
  const {
    restaurantData,
    cuisines,
    restaurantAccessList,
    deliveryLinks,
    isLoading,
    deliveryLinksLoading,
    isOwner,
    updateRestaurant,
    addDeliveryLink,
    deleteDeliveryLink,
    getCuisines,
  } = useRestaurantAccess({ includeDeliveryLinks: true });
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<Restaurant | null>(null);
  const [newFeature, setNewFeature] = useState<RestaurantFeature | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Get the display data (either editable or current)
  const displayData = editableData || restaurantData;

  // Get the hero image from assigned images only
  const heroImageId = 
    restaurantData?.assignedImages?.profileImage?.mediaId?._id ||
    restaurantData?.assignedImages?.logo?.mediaId?._id;
  
  const { data: mediaData } = useMediaWithOptimizedUrl(heroImageId || "", "large");

  const heroImage = (() => {
    // Only use URLs that are valid
    const optimizedUrl = mediaData?.optimizedUrl;
    const mediaUrl = mediaData?.media?.url;
    
    if (optimizedUrl && isValidUrl(optimizedUrl)) return optimizedUrl;
    if (mediaUrl && isValidUrl(mediaUrl)) return mediaUrl;
    if (heroImageId && isValidUrl(heroImageId)) return heroImageId;
    
    return null; 
  })();

  // Merge business hours from restaurant data with defaults
  const mergedBusinessHours = useMemo(() => {
    return restaurantData?.businessHours?.length
      ? restaurantData.businessHours.map((hour: BusinessHour) => ({
          day: hour.day,
                  open: hour.open,
        close: hour.close,
        closed: hour.isClosed,
        }))
      : DEFAULT_BUSINESS_HOURS;
  }, [restaurantData?.businessHours]);

  const handleImageUpload = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const handleImageModalClose = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

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
    if (!editableData?._id) {
      return;
    }
    try {
      updateRestaurant({
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
      assignedImages: restaurantData.assignedImages,
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

  const handleAddDeliveryLink = useCallback(
    (data: Partial<DeliveryLink>) => {
      const currentRestaurantId = restaurantData?._id || "";
      if (!currentRestaurantId) return;
      addDeliveryLink({ restaurantId: currentRestaurantId, data });
    },
    [restaurantData?._id, addDeliveryLink]
  );

  const handleDeleteDeliveryLink = useCallback(
    (linkId: string) => {
      const currentRestaurantId = restaurantData?._id || "";
      if (!currentRestaurantId) return;
      deleteDeliveryLink({ restaurantId: currentRestaurantId, linkId });
    },
    [restaurantData?._id, deleteDeliveryLink]
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

  // Load cuisines
  useEffect(() => {
    getCuisines();
  }, [getCuisines]);

  // Sync editableData with restaurantData when assignedImages change
  useEffect(() => {
    if (isEditing && editableData && restaurantData) {
      // Only update if assignedImages actually changed to avoid infinite loops
      if (JSON.stringify(editableData.assignedImages) !== JSON.stringify(restaurantData.assignedImages)) {
        setEditableData(prev => prev ? {
          ...prev,
          assignedImages: restaurantData.assignedImages,
        } : null);
      }
    }
  }, [isEditing, editableData, restaurantData]);

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
            <div className="text-sm text-gray-600">
              Please contact support if you believe this is an error.
            </div>
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
            <div className="text-sm text-gray-600">
              Please wait while we fetch your restaurant information.
            </div>
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
              : "You don't have access to any restaurants. Please contact your restaurant administrator."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background">
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

      <div className="w-full mx-auto px-2 md:px-10 py-10 space-y-4">
        <BasicInformation
          removeCuisine={removeCuisine}
          isEditing={isEditing}
          addCuisine={addCuisine}
          cuisines={cuisines || []}
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

      {/* Image Management Modal */}
      <RestaurantImageModal
        isOpen={isImageModalOpen}
        onClose={handleImageModalClose}
        restaurantId={restaurantData?._id || ""}
        assignedImages={restaurantData?.assignedImages}
        gallery={restaurantData?.gallery || []}
      />
    </main>
  );
}

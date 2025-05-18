"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import { useRouter } from "next/navigation";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export default function RestaurantProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const restaurantData = useRestaurantStore((state) => state.restaurantData);
  const getRestaurantDataByOwnerId = useRestaurantStore(
    (state) => state.getRestaurantByOwnerId
  );
  const updateRestaurantData = useRestaurantStore(
    (state) => state.updateRestaurant
  );
  const getRestaurantData = useRestaurantStore(
    (state) => state.getRestaurantById
  );

  const { restaurantAccessList } = useRestaurantAccessStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<RestaurantData | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [newCuisine, setNewCuisine] = useState<string>("");

  // Use editableData when in edit mode, otherwise use restaurantData
  const displayData = isEditing ? editableData : restaurantData;

  const DEFAULT_BUSINESS_HOURS = [
    { day: "Monday", open: "09:00", close: "17:00", closed: false },
    { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
    { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
    { day: "Thursday", open: "09:00", close: "17:00", closed: false },
    { day: "Friday", open: "09:00", close: "17:00", closed: false },
    { day: "Saturday", open: "10:00", close: "15:00", closed: false },
    { day: "Sunday", open: "10:00", close: "15:00", closed: true },
  ] as BusinessHours[];

  // check why businessHours isnt updating
  const [businessHours, setBusinessHours] = useState(DEFAULT_BUSINESS_HOURS);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Handle image upload logic here
  };

  const handleSave = async () => {
    if (editableData && editableData._id) {
      try {
        const response = await updateRestaurantData({
          data: editableData,
          id: editableData._id,
        });

        if (!response.success) {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }

      setIsEditing(false);
      setEditableData(null);
    } else {
      console.log("something");
    }
  };

  const handleEdit = () => {
    setEditableData({ ...restaurantData!, businessHours: businessHours });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableData(null);
  };

  const addFeature = () => {
    if (
      newFeature.trim() &&
      editableData &&
      !editableData.features.includes(newFeature.trim())
    ) {
      setEditableData((prev) => ({
        ...prev!,
        features: [...prev!.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    if (editableData) {
      setEditableData((prev) => ({
        ...prev!,
        features: prev!.features.filter((f) => f !== feature),
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addFeature();
    }
  };

  const handleInputChange = (field: keyof RestaurantData, value: any) => {
    if (editableData) {
      setEditableData((prev) => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const handleBusinessHoursChange = (
    index: number,
    field: keyof BusinessHours,
    value: any
  ) => {
    if (editableData && editableData.businessHours) {
      const newHours = [...editableData.businessHours];
      newHours[index] = {
        ...newHours[index],
        [field]: value,
      };
      setEditableData((prev) => ({
        ...prev!,
        businessHours: newHours,
      }));
    }
  };

  const approvedAccess = useMemo(() => {
    return restaurantAccessList.filter(({ status }) => status === "approved");
  }, [restaurantAccessList]);

  console.log("approvedAccess", approvedAccess);
  useEffect(() => {
    if (!session || !session.user) {
      alert("No user session found. Redirecting to login page.");
      router.push("/login");
      return;
    }

    const userId = session.user._id ?? "";
    const accessLevel = session.user.userTypeDetails?.level ?? undefined;

    const fetchRestaurantData = async () => {
      if (userId && accessLevel !== undefined) {
        // If user is an owner, fetch restaurant data by owner ID
        if (accessLevel <= 1) {
          await getRestaurantDataByOwnerId(userId);
        } else {
          // If user is at least USER, check for restaurant where admin has approved access. fetch restaurant data by restaurant ID
          if (approvedAccess && approvedAccess.length > 0) {
            const restaurantId = approvedAccess[0]?.restaurantId as string;
            if (restaurantId) {
              console.log("restaurantId", restaurantId);
              await getRestaurantData(restaurantId);
            }
          }
        }
      } else {
        // Handle case where user ID is not found
        alert("No user ID found. Redirecting to login page.");
        router.push("/login");
      }
    };
    
    fetchRestaurantData();
    
    // Determine user access level and fetch restaurant data accordingly
  }, [
    session?.user?._id,
    session?.user?.userTypeDetails?.level,
    restaurantAccessList,
  ]);

  useEffect(() => {
    if (displayData?.businessHours && displayData.businessHours.length >= 1) {
      setBusinessHours(
        DEFAULT_BUSINESS_HOURS.map((defaultHours) => {
          const existingHours = displayData.businessHours.find(
            (h: any) => h.day === defaultHours.day
          );
          return existingHours || defaultHours;
        })
      );
    }
  }, [displayData]);

  if (!displayData) return null;

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

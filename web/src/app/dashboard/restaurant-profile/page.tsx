"use client";

import React, { useEffect, useState } from "react";
import image1 from "@/assets/hero/mgg-vitchakorn-DDn9I5V1ubE-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  updateRestaurantData,
  getRestaurantData,
} from "@/state/restaurantData/restaurantDataSlice";
import Hero from "../components/restaurant-profile/Hero";
import BasicInformation from "../components/restaurant-profile/BasicInformation";
import ContactInformation from "../components/restaurant-profile/ContactInformation";
import BusinessHours from "../components/restaurant-profile/BusinessHours";
import Features from "../components/restaurant-profile/Features";
import { RestaurantDataState } from "@/types/restaurantData";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export default function RestaurantProfile() {
  const { restaurantData, error, status } = useSelector(
    (state: RootState) => state.restaurantData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<RestaurantDataState | null>(
    null
  );
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

  const handleSave = () => {
    if (editableData) {
      dispatch(
        updateRestaurantData({ data: editableData, id: editableData._id })
      );
      setIsEditing(false);
      setEditableData(null);
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

  const handleInputChange = (field: keyof RestaurantDataState, value: any) => {
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

  useEffect(() => {
    console.log(restaurantData);
    
    dispatch(getRestaurantData(restaurantData._id));
  }, [dispatch]);

  useEffect(() => {
    if (displayData?.businessHours && displayData.businessHours.length >= 1) {
      setBusinessHours(
        DEFAULT_BUSINESS_HOURS.map((defaultHours) => {
          const existingHours = displayData.businessHours.find(
            (h) => h.day === defaultHours.day
          );
          return existingHours || defaultHours;
        })
      );
    }
  }, [displayData]);

  if (!displayData) return null;

  console.log(restaurantData);
  
  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero
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
        {/* Basic Information */}
        <BasicInformation
          isEditing={isEditing}
          newCuisine={newCuisine}
          setNewCuisine={setNewCuisine}
          editableData={editableData}
          setEditableData={setEditableData}
          displayData={displayData}
          handleInputChange={handleInputChange}
        />

        {/* Contact Information */}
        <ContactInformation
          isEditing={isEditing}
          displayData={displayData}
          handleInputChange={handleInputChange}
        />

        {/* Business Hours */}
        <BusinessHours
          businessHours={businessHours}
          isEditing={isEditing}
          handleBusinessHoursChange={handleBusinessHoursChange}
        />

        {/* Features */}
        <Features
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

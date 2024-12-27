"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import image1 from "@/assets/hero/mgg-vitchakorn-DDn9I5V1ubE-unsplash.jpg";
import {
  Upload,
  MapPin,
  Phone,
  Globe,
  Mail,
  Edit,
  Save,
  Plus,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  updateRestaurantData,
  getRestaurantData,
  RestaurantDataState,
} from "@/state/restaurantData/restaurantDataSlice";

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Handle image upload logic here
  };

  const handleSave = () => {
    if (editableData) {
      dispatch(updateRestaurantData(editableData));
      setIsEditing(false);
      setEditableData(null);
    }
  };

  const handleEdit = () => {
    setEditableData(restaurantData);
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
    dispatch(getRestaurantData());
  }, [dispatch]);

  if (!displayData) return null;

  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[30vh] bg-black text-white flex flex-col items-start justify-center px-14"
        aria-label="Restaurant header"
      >
        <Image
          alt="Restaurant profile cover"
          src={image1}
          priority
          fill
          sizes="100vw"
          className="object-cover"
          role="img"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        <div className="z-10 w-full flex items-end justify-between">
          <div>
            <h1 className="text-6xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full text-6xl font-bold bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-white rounded"
                  aria-label="Restaurant name"
                />
              ) : (
                displayData.name
              )}
            </h1>
            <p role="contentinfo">
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-white rounded"
                  aria-label="Restaurant description"
                />
              ) : (
                displayData.description
              )}
            </p>
          </div>
          <div
            className="flex gap-2"
            role="toolbar"
            aria-label="Profile actions"
          >
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Save changes"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Cancel editing"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Edit profile"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            <label className="cursor-pointer">
              <button
                className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Upload new cover image"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                aria-label="Upload image"
              />
            </label>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Basic Information */}
        <section
          className="bg-white rounded-lg shadow-sm border p-6"
          aria-labelledby="basic-info-heading"
        >
          <div className="mb-4">
            <h2 id="basic-info-heading" className="text-lg font-semibold">
              Basic Information
            </h2>
          </div>

          {/* finsh setting up cuisine */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label id="cuisine-label" className="text-sm font-medium">
                  Cuisine Type
                </label>
                {isEditing ? (
                  <>
                    <div className="flex gap-4">
                      <input
                        className="rounded-md border px-3 py-2 bg-white disabled:bg-gray-100"
                        value={newCuisine}
                        type="text"
                        onChange={(e) => setNewCuisine(e.target.value)}
                      />
                      <button
                      className="rounded-md px-3 py-2 bg-teal-400"
                        onClick={() => {
                          if (editableData && newCuisine) {
                            setEditableData((prev) => ({
                              ...prev!,
                              cuisine: [...prev!.cuisine, newCuisine],
                            }));
                          }
                          setNewCuisine("");
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div>
                      <ul>
                        {displayData.cuisine?.map((cuisine) => (
                          <li key={cuisine}>{cuisine.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div>
                    <ul>
                      {displayData.cuisine?.map((cuisine) => (
                        <li key={cuisine}>{cuisine.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label id="price-label" className="text-sm font-medium">
                  Price Range
                </label>
                <select
                  value={displayData.priceRange}
                  onChange={(e) =>
                    handleInputChange("priceRange", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full rounded-md border px-3 py-2 bg-white disabled:bg-gray-100"
                  aria-labelledby="price-label"
                >
                  <option value="$">$ (Budget)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Expensive)</option>
                  <option value="$$$$">$$$$ (Luxury)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label id="description-label" className="text-sm font-medium">
                Full Description
              </label>
              <textarea
                value={displayData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your restaurant"
                disabled={!isEditing}
                rows={4}
                className="w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
                aria-labelledby="description-label"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section
          className="bg-white rounded-lg shadow-sm border p-6"
          aria-labelledby="contact-info-heading"
        >
          <div className="mb-4">
            <h2 id="contact-info-heading" className="text-lg font-semibold">
              Contact Information
            </h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label id="address-label" className="text-sm font-medium">
                Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                  value={displayData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  aria-labelledby="address-label"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label id="phone-label" className="text-sm font-medium">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    type="tel"
                    className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                    value={displayData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    aria-labelledby="phone-label"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label id="email-label" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                    value={displayData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    aria-labelledby="email-label"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label id="website-label" className="text-sm font-medium">
                Website
              </label>
              <div className="relative">
                <Globe
                  className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="url"
                  className="w-full rounded-md border pl-10 pr-3 py-2 disabled:bg-gray-100"
                  value={displayData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  disabled={!isEditing}
                  aria-labelledby="website-label"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section
          className="bg-white rounded-lg shadow-sm border p-6"
          aria-labelledby="hours-heading"
        >
          <div className="mb-4">
            <h2 id="hours-heading" className="text-lg font-semibold">
              Business Hours
            </h2>
          </div>
          <div className="space-y-4" role="table" aria-label="Business hours">
            {displayData.businessHours?.map((hours, index) => (
              <div
                key={hours.day}
                className="grid grid-cols-4 gap-4 items-center"
                role="row"
              >
                <span className="font-medium" role="rowheader">
                  {hours.day}
                </span>
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "open", e.target.value)
                  }
                  disabled={!isEditing || hours.closed}
                  className="rounded-md border px-3 py-2 disabled:bg-gray-100"
                  aria-label={`${hours.day} opening time`}
                />
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "close", e.target.value)
                  }
                  disabled={!isEditing || hours.closed}
                  className="rounded-md border px-3 py-2 disabled:bg-gray-100"
                  aria-label={`${hours.day} closing time`}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) =>
                      handleBusinessHoursChange(
                        index,
                        "closed",
                        e.target.checked
                      )
                    }
                    disabled={!isEditing}
                    className="mr-2"
                    aria-label={`${hours.day} closed`}
                    id={`closed-${hours.day}`}
                  />
                  <label htmlFor={`closed-${hours.day}`} className="text-sm">
                    Closed
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          className="bg-white rounded-lg shadow-sm border p-6"
          aria-labelledby="features-heading"
        >
          <div className="mb-4">
            <h2 id="features-heading" className="text-lg font-semibold">
              Restaurant Features
            </h2>
          </div>
          {isEditing && (
            <div
              className="flex gap-2 mb-4"
              role="form"
              aria-label="Add new feature"
            >
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add a feature (e.g., Outdoor Seating, WiFi)"
                className="flex-1 rounded-md border px-3 py-2"
                aria-label="New feature name"
              />
              <button
                onClick={addFeature}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                aria-label="Add feature"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Restaurant features"
          >
            {displayData.features?.map((feature) => (
              <div
                key={feature}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                role="listitem"
              >
                <span>{feature}</span>
                {isEditing && (
                  <button
                    onClick={() => removeFeature(feature)}
                    className="hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                    aria-label={`Remove ${feature}`}
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            ))}
            {displayData.features?.length === 0 && (
              <p className="text-gray-500 italic" role="status">
                No features added yet
              </p>
            )}
          </div>
        </section>

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

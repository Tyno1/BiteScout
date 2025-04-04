"use client";

import Button from "@/components/atoms/buttons/Button";
import Input from "@/components/atoms/inputs/Input";
import { createRestaurantData } from "@/state/restaurantData/restaurantDataSlice";
import { AppDispatch, RootState } from "@/state/store";
import { RestaurantDataState } from "@/types/restaurantData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding() {
  const {
    restaurantData: restaurant,
    error,
    status,
  } = useSelector((state: RootState) => state.restaurantData);
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const router = useRouter();

  const defaultRestaurantData: RestaurantDataState = {
    name: "",
    logo: "ttt",
    description: "",
    cuisine: [],
    priceRange: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    businessHours: [
      {
        day: "",
        open: "",
        close: "",
        closed: false,
      },
    ],
    features: [],
    gallery: [],
    meta: {},
    owner: false,
    ownerId: "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantData, setRestaurantData] = useState(defaultRestaurantData);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState({
    name: "",
    restaurantCount: "",
    submission: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (restaurantData.owner && session?.data?.user?.id) {
      // Ensure all required fields are present
      const businessHours = restaurantData.businessHours.map((hour) => ({
        day: hour.day || "Monday", // Default value
        open: hour.open || "09:00", // Default value
        close: hour.close || "17:00", // Default value
        closed: hour.closed || false,
      }));

      const newRestaurantData: RestaurantDataState = {
        ...restaurantData,
        ownerId: session.data.user.id,
        businessHours: businessHours, // Required with proper structure
        priceRange: restaurantData.priceRange || "$",
      };

      console.log("Submitting complete restaurant data:", newRestaurantData);

      try {
        const resultAction = await dispatch(
          createRestaurantData(newRestaurantData)
        );
        console.log(resultAction);

        if (createRestaurantData.fulfilled.match(resultAction)) {
          console.log("Restaurant created successfully:", resultAction.payload);
          router.push("/dashboard");
        } else {
          console.error("Failed to create restaurant:", resultAction.error);
        }
      } catch (error) {
        console.error("Error creating restaurant:", error);
      }
    } else {
      router.push("/onboarding/restaurant-search");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl text-black">
                Welcome{" "}
                <span className="font-bold">{session.data?.user.name}</span>
              </h1>
              <p className="text-gray-900">
                Please tell us about your role and restaurant
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select your role:
              </h2>
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  text="Restaurant Owner"
                  onClick={() =>
                    setRestaurantData((prev) => ({ ...prev, owner: true }))
                  }
                  fullWidth
                />
                <Button
                  variant="outline"
                  text="Employee"
                  onClick={() =>
                    setRestaurantData((prev) => ({ ...prev, owner: false }))
                  }
                  fullWidth
                />
              </div>
            </div>

            {/* Restaurant Name Input */}
            {restaurantData.owner && (
              <Input
                label="Restaurant Name"
                name="name"
                outlineType="round"
                useLabel
                value={restaurantData.name}
                onChange={handleInputChange}
                id="restaurant-name"
                placeholder="Enter your restaurant name"
                type="text"
                fullWidth
                labelStyle="text-lg"
                inputSize="md"
                errorMessage={
                  formError.name && "You must enter a restaurant name"
                }
              />
            )}

            {message && (
              <div className="space-y-2">
                <p className="text-sm text-green-500">{message}</p>
              </div>
            )}
            {/* Submit Button */}

            {restaurantData.owner ? (
              <Button
                variant="solid"
                type="submit"
                disabled={!restaurantData.name}
                text={
                  isSubmitting
                    ? "Creating your restaurant"
                    : "Create Restaurant Profile"
                }
                fullWidth
              />
            ) : (
              <Button
                variant="solid"
                type="submit"
                text="Find Your Restaurant"
                fullWidth
              />
            )}

            {apiError && (
              <div className="space-y-2">
                <p className="text-sm text-red-500">{apiError}</p>
              </div>
            )}
            {formError.submission ||
              (formError.restaurantCount && (
                <div className="space-y-2">
                  <p className="text-sm text-red-500">
                    {formError.submission || formError.restaurantCount}
                  </p>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

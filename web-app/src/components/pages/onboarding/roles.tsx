import Button from "@/components/atoms/buttons/Button";
import Input from "@/components/atoms/inputs/Input";
import { UserContext } from "@/providers/userContext";
import { createRestaurantData } from "@/state/restaurantData/restaurantDataSlice";
import { AppDispatch } from "@/state/store";
import { RestaurantDataState } from "@/types/restaurantData";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Roles = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, UpdateUserRestaurantCountAndUserTpe, token } =
    useContext(UserContext);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const DEFAULT_RESTAURANT_DATA: RestaurantDataState = {
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
  const [restaurantData, setRestaurantData] = useState(DEFAULT_RESTAURANT_DATA);
  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState({
    name: "",
    restaurantCount: "",
    submission: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prev) => ({ ...prev, name: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");
    setFormError({
      name: "",
      restaurantCount: "",
      submission: "",
    });

    try {
      if (restaurantData.owner) {
        // Validate restaurant owner submission
        if (!restaurantData.name.trim()) {
          // Handle empty restaurant name error
          setFormError((prev) => ({
            ...prev,
            name: "Restaurant name is required",
          }));
          setRestaurantData((prev) => ({ ...prev, name: "" }));
          return;
        }
        if (!userData?._id) {
          setApiError(
            "User profile not found. Please refresh the page or contact support."
          );
          setIsSubmitting(false);
          return;
        }
        // Ensure all required fields are present
        const businessHours = restaurantData.businessHours.map((hour) => ({
          day: hour.day || "Monday", // Default value
          open: hour.open || "09:00", // Default value
          close: hour.close || "17:00", // Default value
          closed: hour.closed || false,
        }));
        // create the new restaurant payload
        const newRestaurantData: RestaurantDataState = {
          ...restaurantData,
          ownerId: userData._id,
          businessHours: businessHours,
          priceRange: restaurantData.priceRange || "$",
        };

        const resultAction = await dispatch(
          createRestaurantData({ restaurantData: newRestaurantData, token })
        );

        if (createRestaurantData.fulfilled.match(resultAction)) {
          setMessage("Restaurant created successfully!");

          // Update user's restaurant count and handle potential errors
          try {
            await UpdateUserRestaurantCountAndUserTpe(userData._id);
            toast.success("Restaurant created successfully!");
            setIsSubmitting(false);
            navigate("/dashboard");
          } catch (updateError) {
            console.error(
              "Failed to update user restaurant count:",
              updateError
            );
            // Show warning
            toast.warning(
              "Restaurant created, but profile update incomplete. This will be fixed automatically."
            );
            setIsSubmitting(false);
          }
        } else {
          // Handle API error with specific message based on error type
          console.log(resultAction.error.message);

          const errorPayload = resultAction.error?.message || "";
          let userFriendlyMessage =
            "Failed to create restaurant. Please try again.";

          if (errorPayload.includes("validation")) {
            userFriendlyMessage =
              "Some restaurant information is invalid. Please check all fields.";
          } else if (errorPayload.includes("409")) {
            userFriendlyMessage = "A restaurant with this name already exists.";
          } else if (errorPayload.includes("auth")) {
            userFriendlyMessage =
              "Your session has expired. Please log in again.";
          }

          setApiError(userFriendlyMessage);
          toast.error(userFriendlyMessage);
        }
      } else {
        // Employee logic
        setMessage("Redirecting to restaurant search...");
        navigate("/onboarding/restaurant-search");
      }
    } catch (error) {
      // Better error handling
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Form submission error:", error);
      setFormError((prev) => ({ ...prev, submission: errorMessage }));
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user has created a restaurant
  useEffect(() => {
    if (userData && userData?.restaurantCount > 0) {
      navigate("/dashboard");
    }
  }, [userData.restaurantCount]);

  // If they have restaurants, don't render anything while redirecting
  if (userData?.restaurantCount > 0) {
    return <div>redirecting to dashboard</div>;
  }

  // Add a check to see if the logged in user has restaurant acess

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
                Welcome <span className="font-bold">{userData.name}</span>
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
};
export default Roles;

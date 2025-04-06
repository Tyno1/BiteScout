"use client";

import type React from "react";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createRestaurantData } from "@/state/restaurantData/restaurantDataSlice";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import type { AppDispatch } from "@/state/store";
import type { RestaurantDataState } from "@/types/restaurantData";
import { RoleOnboardingForm } from "../components/roleOnboardingForm";
import { DEFAULT_RESTAURANT_DATA } from "../constants";
import type { FormErrorState } from "../components/roleOnboardingForm";

export default function Onboarding() {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const router = useRouter();
  const { updateUser } = useUpdateUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantData, setRestaurantData] = useState<RestaurantDataState>(
    DEFAULT_RESTAURANT_DATA
  );
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<FormErrorState>({
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
  };

  const handleRoleSelection = (isOwner: boolean) => {
    setRestaurantData((prev) => ({ ...prev, owner: isOwner }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    resetErrors();

    try {
      if (restaurantData.owner) {
        await handleOwnerSubmission();
      } else {
        handleEmployeeSubmission();
      }
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetErrors = () => {
    setApiError("");
    setFormError({
      name: "",
      restaurantCount: "",
      submission: "",
    });
  };

  const handleOwnerSubmission = async () => {
    // Validate restaurant name
    if (!restaurantData.name.trim()) {
      setFormError((prev) => ({
        ...prev,
        name: "Restaurant name is required",
      }));
      setRestaurantData((prev) => ({ ...prev, name: "" }));
      setIsSubmitting(false);
      return;
    }

    // Validate user session
    if (!session.data?.user?._id) {
      setApiError(
        "User profile not found. Please refresh the page or contact support."
      );
      setIsSubmitting(false);
      return;
    }

    // Prepare restaurant data
    const preparedData = prepareRestaurantData();

    // Create restaurant
    const resultAction = await dispatch(createRestaurantData(preparedData));

    if (createRestaurantData.fulfilled.match(resultAction)) {
      await handleSuccessfulCreation();
    } else {
      handleCreationError(resultAction.error);
    }
  };

  const prepareRestaurantData = (): RestaurantDataState => {
    const businessHours = restaurantData.businessHours.map((hour) => ({
      day: hour.day || "Monday",
      open: hour.open || "09:00",
      close: hour.close || "17:00",
      closed: hour.closed || false,
    }));

    return {
      ...restaurantData,
      ownerId: session?.data?.user?._id || "",
      businessHours,
      priceRange: restaurantData.priceRange || "$",
    };
  };

  const handleSuccessfulCreation = async () => {
    setMessage("Restaurant created successfully!");

    try {
      if (session?.data?.user?._id) {
        await updateUser(session.data.user._id);
        router.push("/dashboard");
      }
    } catch (updateError) {
      console.error("Failed to update user restaurant count:", updateError);
      toast.warning(
        "Restaurant created, but profile update incomplete. This will be fixed automatically."
      );
      router.push("/dashboard");
    }
  };

  const handleCreationError = (error: any) => {
    console.error("Restaurant creation error:", error);

    const errorPayload = error?.message || "";
    let userFriendlyMessage = "Failed to create restaurant. Please try again.";

    if (errorPayload.includes("validation")) {
      userFriendlyMessage =
        "Some restaurant information is invalid. Please check all fields.";
    } else if (errorPayload.includes("409")) {
      userFriendlyMessage = "A restaurant with this name already exists.";
    } else if (errorPayload.includes("auth")) {
      userFriendlyMessage = "Your session has expired. Please log in again.";
    }

    setApiError(userFriendlyMessage);
  };

  const handleEmployeeSubmission = () => {
    setMessage("Redirecting to restaurant search...");
    router.push("/onboarding/restaurant-search");
  };

  const handleSubmissionError = (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Form submission error:", error);
    setFormError((prev: FormErrorState) => ({
      ...prev,
      submission: errorMessage,
    }));
    toast.error("Something went wrong. Please try again later.");
  };

  return (
    <RoleOnboardingForm
      session={session}
      restaurantData={restaurantData}
      isSubmitting={isSubmitting}
      message={message}
      apiError={apiError}
      formError={formError}
      handleInputChange={handleInputChange}
      handleRoleSelection={handleRoleSelection}
      handleSubmit={handleSubmit}
    />
  );
}

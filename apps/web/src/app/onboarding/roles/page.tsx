"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type React from "react";
import { useMemo, useState } from "react";
import type { Restaurant } from "shared/types/api/schemas";
import { RoleOnboardingForm } from "@/components/ui";
import { useCreateRestaurant } from "@/hooks/restaurant";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { DEFAULT_RESTAURANT_DATA } from "../constants";

export default function Onboarding() {
  const createRestaurantMutation = useCreateRestaurant();
  const { data: session } = useSession();
  const router = useRouter();
  const { updateUser } = useUpdateUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (isOwner) {
        await handleOwnerSubmission();
      } else {
        handleEmployeeSubmission();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOwnerSubmission = async () => {
    if (!restaurantName.trim()) {
      setError("Restaurant name is required");
      return;
    }

    const restaurantData: Restaurant = {
      ...DEFAULT_RESTAURANT_DATA,
      name: restaurantName,
      ownerId: session?.user?._id || "",
    };

    await createRestaurantMutation.mutateAsync(restaurantData);
    await handleSuccessfulCreation();
  };

  const handleSuccessfulCreation = async () => {
    setMessage(
      "Restaurant created successfully! Please log in again to access your new permissions."
    );

    if (session?.user?._id) {
      await updateUser(session.user._id);
      await signOut({ redirect: false });
      router.push("/login");
    }
  };

  const handleEmployeeSubmission = () => {
    router.push("/onboarding/restaurant-search");
  };

  const restaurantData: Restaurant = useMemo(
    () => ({
      ...DEFAULT_RESTAURANT_DATA,
      name: restaurantName,
      ownerId: session?.user?._id || "",
    }),
    [restaurantName, session?.user?._id]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setRestaurantName(e.target.value);
    }
  };

  const handleRoleSelection = (owner: boolean) => {
    setIsOwner(owner);
  };

  return (
    <RoleOnboardingForm
      session={{ data: session }}
      restaurantData={restaurantData}
      isOwner={isOwner}
      isSubmitting={isSubmitting}
      message={message}
      apiError={error}
      handleInputChange={handleInputChange}
      handleRoleSelection={handleRoleSelection}
      handleSubmit={handleSubmit}
    />
  );
}

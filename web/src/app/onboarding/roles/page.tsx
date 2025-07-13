"use client";

import type React from "react";

import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { Spinner } from "@/components/atoms/loaders/Spinners";
import { type FormErrorState, RoleOnboardingForm } from "@/components/ui";
import useRestaurantStore from "@/stores/restaurantStore";
import type { Restaurant } from "@shared/types/api/schemas";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_RESTAURANT_DATA } from "../constants";

export default function Onboarding() {
	const { createRestaurant } = useRestaurantStore();
	const session = useSession();
	const router = useRouter();
	const { updateUser } = useUpdateUser();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [restaurantData, setRestaurantData] = useState<Restaurant>(
		DEFAULT_RESTAURANT_DATA,
	);
	const [apiError, setApiError] = useState("");
	const [message, setMessage] = useState("");
	const [formError, setFormError] = useState<FormErrorState>({
		name: "",
		restaurantCount: "",
		submission: "",
	});
	const [shouldRender, setShouldRender] = useState(false);

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
				"User profile not found. Please refresh the page or contact support.",
			);
			setIsSubmitting(false);
			return;
		}

		// Prepare restaurant data
		const preparedData = prepareRestaurantData();
		console.log("Prepared restaurant data:", preparedData);

		// Create restaurant
		const result = await createRestaurant(preparedData);

		if (result.success) {
			await handleSuccessfulCreation();
		} else {
			handleCreationError(result.error);
		}
	};
	session?.data?.user?.accessToken;
	  const prepareRestaurantData = (): Restaurant => {
    const businessHours = restaurantData.businessHours?.map((hour) => ({
      day: hour.day || "Monday",
      open: hour.open || "09:00",
      close: hour.close || "17:00",
      closed: hour.closed || false,
    })) || [];

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
				"Restaurant created, but profile update incomplete. This will be fixed automatically.",
			);
			router.push("/dashboard");
		}
	};

	  const handleCreationError = (error: string | undefined) => {
    console.log("Restaurant creation error:", error);
    setApiError(error || "An error occurred");
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

	useEffect(() => {
		if (
			session?.data?.user?.restaurantCount &&
			session.data.user?.restaurantCount >= 1
		) {
			router.push("/dashboard");
			setShouldRender(false);
		} else {
			setShouldRender(true);
		}
	}, [session, router]);

	if (!shouldRender)
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<Spinner />
			</div>
		);

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

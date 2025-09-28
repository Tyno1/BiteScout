"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type React from "react";
import { useCallback, useState } from "react";
import type { Restaurant } from "shared/types/api/schemas";
import { RoleOnboardingForm } from "@/components/ui";
import { useCreateRestaurant } from "@/hooks/restaurant";
import { useGetSession } from "@/hooks/useGetSession";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { DEFAULT_RESTAURANT_DATA } from "../constants";

export default function Onboarding() {
	const createRestaurantMutation = useCreateRestaurant();
	const router = useRouter();
	const { updateUser } = useUpdateUser();
	const session = useGetSession();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [restaurantData, setRestaurantData] = useState<Restaurant>(
		DEFAULT_RESTAURANT_DATA,
	);
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "name") {
			setRestaurantData({ ...restaurantData, name: e.target.value });
		}
	};

	const handleRoleSelection = (owner: boolean) => {
		setIsOwner(owner);
	};

	const handleSuccessfulCreation = useCallback(async () => {
		setMessage(
			"Restaurant created successfully! Please log in again to access your new permissions.",
		);

		if (session?.user?._id) {
			await updateUser(session.user._id);
			await signOut({ redirect: false });
			router.push("/onboarding/refresh/owner");
		}
	}, [session?.user?._id, updateUser, router]);

	const handleOwnerSubmission = useCallback(async () => {
		if (!restaurantData.name?.trim()) {
			setError("Restaurant name is required");
			return;
		}
		if (!session?.user?._id) {
			setError("User ID is required");
			return;
		}

		await createRestaurantMutation.mutateAsync({
			...restaurantData,
			ownerId: session?.user?._id,
		});
		await handleSuccessfulCreation();
	}, [
		restaurantData,
		session?.user?._id,
		createRestaurantMutation,
		handleSuccessfulCreation,
	]);

	const handleEmployeeSubmission = () => {
		router.push("/onboarding/restaurant-search");
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

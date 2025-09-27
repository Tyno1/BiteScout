"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";

interface RouteProtectionProps {
	children: React.ReactNode;
}

function RouteProtectionContent({ children }: RouteProtectionProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { restaurantData, isOwner, restaurantAccessList } =
		useRestaurantAccess();

	const currentRestaurantId =
		searchParams.get("restaurantId") || searchParams.get("id");

	// Get the default restaurant ID for this user
	const defaultRestaurantId =
		isOwner && restaurantData?._id ? restaurantData._id : null;

	// For non-owners (moderators), get the restaurant ID from their approved access
	const approvedRestaurantId =
		!isOwner && restaurantAccessList.length > 0
			? restaurantAccessList.find((access) => access.status === "approved")
					?.restaurantId
			: null;

	useEffect(() => {
		// Check if this is a dashboard route
		if (pathname.startsWith("/dashboard")) {
			if (!currentRestaurantId) {
				// Try to get restaurant ID from various sources
				const targetRestaurantId = defaultRestaurantId || approvedRestaurantId;

				if (targetRestaurantId) {
					const newUrl = `${pathname}?restaurantId=${targetRestaurantId}`;
					router.replace(newUrl);
				} else {
					// No restaurant ID available - redirect to unauthorized
					router.replace("/dashboard/unauthorized");
				}
			}
		}
	}, [
		pathname,
		currentRestaurantId,
		defaultRestaurantId,
		approvedRestaurantId,
		router,
	]);

	return <>{children}</>;
}

export const RouteProtection = ({ children }: RouteProtectionProps) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouteProtectionContent>{children}</RouteProtectionContent>
		</Suspense>
	);
};

import { Button } from "@/components/atoms";
import type { RestaurantAccess } from "shared/types/api/schemas";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

type RestaurantData = {
	_id: string;
	name: string;
};

type CardProp = {
	data: RestaurantData;
	handleRestaurantSelect: (restaurantId: string) => void;
	restaurantAccessList: RestaurantAccess[];
};

export function SearchResultCard({
	data,
	handleRestaurantSelect,
	restaurantAccessList,
}: CardProp) {
	const [accessStatus, setAccessStatus] = useState<RestaurantAccess["status"] | null>("pending");

	useEffect(() => {
		if (!Array.isArray(restaurantAccessList) || !data?._id) {
			return;
		}

		const restaurantAccess = restaurantAccessList.find(
			(access) => access.restaurantId === data._id,
		);

		if (!restaurantAccess) {
			setAccessStatus(null);
			return;
		}

		switch (restaurantAccess?.status) {
			case "approved":
				setAccessStatus("approved");
				break;
			case "pending":
				setAccessStatus("pending");
				break;
			case "suspended":
				setAccessStatus("suspended");
				break;
			case "innactive":
				setAccessStatus("innactive");
				break;
			default:
				setAccessStatus(null);
				break;
		}
	}, [restaurantAccessList, data?._id]);

	// Render search button based on access status
	const ContactAdmin = () => (
		<div className="mt-3 p-2 bg-blue-50 rounded-md border border-blue-100 flex items-start gap-1">
			<AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
			<p className="text-xs text-blue-700">
				Contact your restaurant admin to activate your access
			</p>
		</div>
	);

	// Render button based on access status
	const renderActionButton = () => {
		switch (accessStatus) {
			case "pending":
				return (
					<div className="flex flex-col justify-end">
						<Button
							disabled
							variant="solid"
							type="button"
							fullWidth
							text="Access Pending"
							className="cursor-not-allowed"
						/>
						<ContactAdmin />
					</div>
				);

			case "approved":
				return (
					<Button
						variant="solid"
						type="button"
						text="Access Approved"
						disabled
						fullWidth
						className="cursor-not-allowed"
					/>
				);

			case "suspended":
				return (
					<div className="flex flex-col justify-end">
						<Button
							disabled
							variant="solid"
							type="button"
							text="Access Suspended"
							fullWidth
							className="cursor-not-allowed"
						/>
						<ContactAdmin />
					</div>
				);

			case "innactive":
				return (
					<div className="flex flex-col justify-end">
						<Button
							disabled
							className="cursor-not-allowed"
							variant="solid"
							type="button"
							fullWidth
							text="Access Deactivated"
						/>
						<ContactAdmin />
					</div>
				);
			case null:
				return (
					<Button
						onClick={() => data._id && handleRestaurantSelect(data._id)}
						variant="solid"
						type="button"
						text="Request Access"
						fullWidth
						className="cursor-not-allowed"
					/>
				);
		}
	};

	return (
		<div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
			<div className="mb-2 sm:mb-0 w-full sm:w-[45%]">
				<span className="text-sm font-medium text-gray-700">
					{data?.name || "Restaurant"}
				</span>
			</div>
			<div className="mb-2 sm:mb-0 w-full sm:w-[45%]">
				{renderActionButton()}
			</div>
		</div>
	);
}

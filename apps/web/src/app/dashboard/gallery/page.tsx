"use client";

import { Gallery } from "@/components/ui/dashboard";
import useRestaurantStore from "@/stores/restaurantStore";
import { useEffect, useState } from "react";
import type { Media } from "shared/types/api/schemas";

export default function GalleryPage() {
	const { restaurantData } = useRestaurantStore();
	const [galleryImages, setGalleryImages] = useState<Media[]>([]);
	const [isEditing, setIsEditing] = useState(false);

	// Initialize gallery images from restaurant data
	useEffect(() => {
		if (restaurantData?.gallery) {
			setGalleryImages(restaurantData.gallery);
		}
	}, [restaurantData?.gallery]);

	const handleImagesChange = (images: Media[]) => {
		setGalleryImages(images);
		// TODO: Update restaurant data with new gallery images
		// This would typically call an API to update the restaurant's gallery
		console.log("Gallery images updated:", images);
	};

	return (
		<div className="p-6">
			<div className="mb-3 flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
					<p className="text-gray-600 mt-2">
						Manage your restaurant&apos;s photo gallery and media content
					</p>
				</div>
				<button
					type="button"
					onClick={() => setIsEditing(!isEditing)}
					className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
				>
					{isEditing ? "View Mode" : "Edit Mode"}
				</button>
			</div>

			<Gallery
				isEditing={isEditing}
				images={galleryImages}
				onImagesChange={handleImagesChange}
			/>
		</div>
	);
}

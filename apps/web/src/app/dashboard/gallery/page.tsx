"use client";

import { Button } from "@/components/atoms";
import { Gallery } from "@/components/ui/dashboard";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { useEffect, useState } from "react";
import type { Media } from "shared/types/api/schemas";

export default function GalleryPage() {
  const { restaurantData } = useRestaurantAccess();
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
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      <div className="mb-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
          <p className="text-foreground text-sm mt-2">
            Manage your restaurant&apos;s photo gallery and media content
          </p>
        </div>

		<Button
			variant="solid"
			text={isEditing ? "View Mode" : "Edit Mode"}
			onClick={() => setIsEditing(!isEditing)}
			color="primary"
			className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
		/>
      </div>

      <Gallery
        isEditing={isEditing}
        images={galleryImages}
        onImagesChange={handleImagesChange}
      />
    </main>
  );
}

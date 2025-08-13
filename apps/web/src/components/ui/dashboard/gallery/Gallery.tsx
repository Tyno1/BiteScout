"use client";

import { Button } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { MediaUpload } from "@/components/ui/media/media-upload";
import { useGalleryState } from "@/hooks/useGalleryState";
import type { Media, UploadMediaResponse } from "@shared/types";
import { useCallback, useEffect, useState } from "react";
import { GalleryCard, ImageFullscreen } from "./";

type GalleryProps = {
  images?: Media[];
  onImagesChange?: (images: Media[]) => void;
  restaurantId: string;
};

// Gallery categories - based on available associatedWith.type values
const GALLERY_CATEGORIES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "post", label: "Posts" },
];

// Brand asset tags for restaurant media
const BRAND_ASSET_TAGS = [
  { value: "brand", label: "Brand Assets" },
  { value: "logo", label: "Logo" },
  { value: "promotional", label: "Promotional" },
  { value: "marketing", label: "Marketing" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "team", label: "Team" },
  { value: "food", label: "Food" },
];

export function Gallery({
  images = [],
  onImagesChange,
  restaurantId,
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<Media | null>(null);

  // Use optimized state management hook
  const {
    filteredImages,
    addImages,
    removeImage,
    updateImageMetadata,
    filterImages,
  } = useGalleryState({
    initialImages: images,
    onImagesChange: onImagesChange || (() => {}),
  });

  // Check if we're in restaurant view mode
  const isRestaurantView = selectedCategory === "restaurant";

  // Check if we can edit the current category - posts are NEVER editable
  const canEditCurrentCategory = isLocalEditing && isRestaurantView;

  // Reset local editing when switching away from restaurant category
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    if (!category || category === "all" || category !== "restaurant") {
      setIsLocalEditing(false);
    }
  }, []);

  // Handle tag filtering
  const handleTagChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  // Update filters when they change
  const updateFilters = useCallback(() => {
    // Convert "all" to empty string for the hook
    const categoryForFilter = selectedCategory === "all" ? "" : selectedCategory;
    filterImages(categoryForFilter, selectedTags);
  }, [filterImages, selectedCategory, selectedTags]);

  // Update filters when category or tags change
  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const handleUploadSuccess = useCallback(
    (result: UploadMediaResponse | UploadMediaResponse[]) => {
      
      let newImages: Media[];
      if (Array.isArray(result)) {
        // Multiple files uploaded
        newImages = result;
      } else {
        // Single file uploaded
        newImages = [result];
      }
      
      // Add new images to gallery state
      addImages(newImages);
    },
    [addImages]
  );

  const handleRemoveUploadedFile = useCallback(
    (index: number) => {
      if (!canEditCurrentCategory) return;

      const imageToRemove = filteredImages[index];
      if (imageToRemove?._id) {
        removeImage(imageToRemove._id);
      }
    },
    [canEditCurrentCategory, filteredImages, removeImage]
  );

  const handleUpdateImageMetadata = useCallback(
    (index: number, field: string, value: string) => {
      
      const imageToUpdate = filteredImages[index];
      if (!imageToUpdate?._id) return;

      updateImageMetadata(imageToUpdate._id, field, value);
    },
    [filteredImages, updateImageMetadata]
  );

  const handleFullscreen = useCallback((image: Media) => {
    setFullscreenImage(image);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  return (
    <Card component="section" padding="lg" aria-labelledby="gallery-heading">
      {/* Image Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1 text-sm rounded-full border ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-card-foreground border-gray/20"
            }`}
          >
            All
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCategory === category.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-card-foreground border-gray/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Edit Toggle - Only visible for restaurant category */}
        {isRestaurantView && (
          <div className="mt-3 flex justify-end">
            <Button
              variant="solid"
              size="sm"
              text={isLocalEditing ? "View Mode" : "Edit Mode"}
              onClick={() => setIsLocalEditing(!isLocalEditing)}
              color="primary"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            />
          </div>
        )}

        {/* Tag Filter for All Images - Hidden in edit mode */}
        {!isLocalEditing && (
          <div className="mt-3">
            <div className="text-sm font-medium text-gray-foreground mb-2">
              Filter by tags:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleTagChange([])}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedTags.length === 0
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-card-foreground border-gray/20"
                }`}
              >
                All Tags
              </button>
              {BRAND_ASSET_TAGS.map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => handleTagChange([tag.value])}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    selectedTags.includes(tag.value)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-card-foreground border-gray/20"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Grid - Only visible in view mode */}
      {!isLocalEditing && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <GalleryCard
              key={image._id || `image-${image.url}`}
              image={image}
              onFullscreen={handleFullscreen}
            />
          ))}
        </div>
      )}

      {/* MediaUpload - Only visible in edit mode */}
      {isLocalEditing && (
        <MediaUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={() => {
            // Error handling is managed by the MediaUpload component internally
          }}
          onRemoveUploadedFile={
            canEditCurrentCategory ? handleRemoveUploadedFile : undefined
          }
          onUpdateUploadedFileMetadata={
            canEditCurrentCategory ? handleUpdateImageMetadata : undefined
          }
          associatedWith={{
            type: selectedCategory === "post" ? "post" : "restaurant",
            id: restaurantId,
          }}
          folder={selectedCategory === "post" ? "post-images" : "gallery-images"}
          multiple={false}
          uploadedFiles={filteredImages}
          editMode={canEditCurrentCategory}
          className={
            canEditCurrentCategory ? "" : "pointer-events-none opacity-75"
          }
        />
      )}

      {/* Empty State */}
      {!isLocalEditing && filteredImages.length === 0 && (
        <div className="text-center py-8 text-gray-foreground">
          <p>No images found.</p>
          <p className="text-sm mt-2">
            {images.length === 0 
              ? "No images have been added to the gallery yet. Switch to edit mode to upload images."
              : "No images match the current filters. Try adjusting your category or tag selection."
            }
          </p>
        </div>
      )}

      {/* Fullscreen Modal */}
      <ImageFullscreen
        image={fullscreenImage}
        onClose={closeFullscreen}
      />
    </Card>
  );
}

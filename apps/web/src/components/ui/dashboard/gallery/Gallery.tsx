"use client";

import { Button } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { MediaUpload } from "@/components/ui/media/media-upload";
import { MediaFolder } from "@/components/ui/media/media-upload/types";
import { usePaginatedRestaurantGallery } from "@/hooks/media/usePaginatedMedia";
import type { CreateMediaResponse, Media } from "@shared/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GalleryCard, ImageFullscreen } from "./";
import { GallerySkeleton } from "./GallerySkeleton";

type GalleryProps = {
  restaurantId: string;
  onImageSelect?: (image: Media) => void;
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

export function Gallery({ restaurantId, onImageSelect }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<Media | null>(null);

  // Add local gallery loading state
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  // Virtual scrolling and lazy loading
  const [visibleCount, setVisibleCount] = useState(8); // Reduced from 12 to 8 for faster initial load
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Use paginated media hook for restaurant gallery
  const {
    data: paginatedMediaData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPaginatedLoading,
  } = usePaginatedRestaurantGallery(restaurantId, true);

  // Flatten all pages into a single array
  const allImages = useMemo(
    () =>
      paginatedMediaData?.pages.flatMap((page) => (page as { media?: Media[] }).media || []) || [],
    [paginatedMediaData?.pages]
  );

  // Apply local filtering to the loaded images
  const [filteredImages, setFilteredImages] = useState<Media[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  // Filter images when category, tags, or loaded images change
  useEffect(() => {
    const filtered = allImages.filter((image) => {
      // If no category is selected, show all images
      if (!currentCategory) {
        // Only apply tag filtering if tags are selected
        if (currentTags.length > 0) {
          const hasMatchingTag =
            image.tags?.some((tag: string) => currentTags.includes(tag)) ?? false;
          return hasMatchingTag;
        }
        return true; // Show all images when no category and no tags selected
      }

      // If category is selected, filter by category first
      if (image.associatedWith?.type !== currentCategory) {
        return false;
      }

      // Then apply tag filtering if tags are selected
      if (currentTags.length > 0) {
        const hasMatchingTag =
          image.tags?.some((tag: string) => currentTags.includes(tag)) ?? false;
        return hasMatchingTag;
      }

      return true;
    });

    setFilteredImages(filtered);
  }, [allImages, currentCategory, currentTags]);

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
    setCurrentCategory(categoryForFilter);
    setCurrentTags(selectedTags);
    // Reset visible count when filters change
    setVisibleCount(8);
  }, [selectedCategory, selectedTags]);

  // Update filters when category or tags change
  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  // Check if gallery data has been loaded
  useEffect(() => {
    if (!isPaginatedLoading && allImages.length > 0) {
      setIsGalleryLoading(false);
      // Reset visible count when gallery data changes
      setVisibleCount(8);
    }
  }, [isPaginatedLoading, allImages.length]);

  // Auto-increase visible count when new pages are loaded
  useEffect(() => {
    if (allImages.length > visibleCount) {
      if (hasNextPage) {
        // While paginating, increase by 8 to keep loading indicator visible
        setVisibleCount(Math.min(visibleCount + 8, allImages.length));
      } else {
        // When all pages are loaded, show all images
        setVisibleCount(allImages.length);
      }
    }
  }, [allImages.length, visibleCount, hasNextPage]);

  // Intersection Observer for infinite scroll pagination
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              // Fetch next page if available
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Set up intersection observer when loading ref becomes available
  useEffect(() => {
    // Use a small delay to ensure the DOM has updated
    const timer = setTimeout(() => {
      if (loadingRef.current && hasNextPage && !isFetchingNextPage) {
        // Clean up previous observer
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                // Fetch next page if available
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }
            }
          },
          { threshold: 0.1 }
        );

        observerRef.current.observe(loadingRef.current);
      }
    }, 100); // Small delay to ensure DOM update

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleUploadSuccess = useCallback((result: CreateMediaResponse | CreateMediaResponse[]) => {
    // Handle both single and array responses
    const results = Array.isArray(result) ? result : [result];

    // Extract media from each response and add to gallery
    const newImages: Media[] = results.filter((media): media is Media => media !== undefined);

    if (newImages.length > 0) {
      // For pagination, we need to refetch the data to get the new images
      // This will trigger a refetch of the current page
      // TODO: Implement optimistic updates or refetch strategy
      console.log("New images uploaded:", newImages);
    }
  }, []);

  const handleRemoveUploadedFile = useCallback(
    (index: number) => {
      if (!canEditCurrentCategory) return;

      const imageToRemove = filteredImages[index];
      if (imageToRemove?._id) {
        // For pagination, we need to refetch the data to reflect the removal
        // TODO: Implement optimistic updates or refetch strategy
        console.log("Image removed:", imageToRemove._id);
      }
    },
    [canEditCurrentCategory, filteredImages]
  );

  const handleUpdateImageMetadata = useCallback(
    (index: number, field: string, value: string) => {
      const imageToUpdate = filteredImages[index];
      if (!imageToUpdate?._id) return;

      // For pagination, we need to refetch the data to reflect the metadata update
      // TODO: Implement optimistic updates or refetch strategy
      console.log("Image metadata updated:", { id: imageToUpdate._id, field, value });
    },
    [filteredImages]
  );

  const handleFullscreen = useCallback((image: Media) => {
    setFullscreenImage(image);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  return (
    <Card component="section" padding="sm" aria-labelledby="gallery-heading">
      {/* Image Category Filter */}
      <div className="mb-6 p-4">
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
            <div className="text-sm font-medium text-gray-foreground mb-2">Filter by tags:</div>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Show skeleton only while gallery data is loading */}
          {isGalleryLoading && <GallerySkeleton count={8} />}

          {/* Show images when gallery data has loaded */}
          {!isGalleryLoading &&
            filteredImages.slice(0, visibleCount).map((image, index) => (
              <GalleryCard
                key={image._id || `image-${image.url}`}
                image={image}
                onFullscreen={handleFullscreen}
                priority={index < 2} // Priority load first 2 images for better LCP
                onUseImage={onImageSelect}
              />
            ))}

          {/* Loading indicator and intersection observer target */}
          {!isGalleryLoading && hasNextPage && (
            <div ref={loadingRef} className="col-span-full flex justify-center py-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>
                  {isFetchingNextPage ? "Loading more images..." : "Scroll to load more images..."}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MediaUpload - Only visible in edit mode */}
      {isLocalEditing && (
        <MediaUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={() => {
            // Error handling is managed by the MediaUpload component internally
          }}
          onRemoveUploadedFile={canEditCurrentCategory ? handleRemoveUploadedFile : undefined}
          onUpdateUploadedFileMetadata={
            canEditCurrentCategory ? handleUpdateImageMetadata : undefined
          }
          associatedWith={{
            type: selectedCategory === "post" ? "post" : "restaurant",
            id: restaurantId,
          }}
          folder={selectedCategory === "post" ? MediaFolder.POST : MediaFolder.GALLERY}
          multiple={false}
          uploadedFiles={filteredImages}
          editMode={canEditCurrentCategory}
          className={canEditCurrentCategory ? "" : "pointer-events-none opacity-75"}
        />
      )}

      {/* Empty State - only when gallery data has loaded and no images */}
      {!isLocalEditing && !isGalleryLoading && filteredImages.length === 0 && (
        <div className="text-center py-8 text-gray-foreground">
          <p>No images found.</p>
          <p className="text-sm mt-2">
            {allImages.length === 0
              ? "No images have been added to the gallery yet. Switch to edit mode to upload images."
              : "No images match the current filters. Try adjusting your category or tag selection."}
          </p>
        </div>
      )}

      {/* Fullscreen Modal */}
      <ImageFullscreen image={fullscreenImage} onClose={closeFullscreen} />
    </Card>
  );
}

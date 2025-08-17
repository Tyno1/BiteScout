"use client";

import { Button } from "@/components/atoms";
import { GallerySkeleton } from "@/components/ui/dashboard/gallery";
import { useUpdateRestaurant } from "@/hooks";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Media } from "shared/types/api/schemas";



// Dynamic imports for code splitting
const Gallery = dynamic(() => import("@/components/ui/dashboard").then(mod => ({ default: mod.Gallery })), {
  loading: () => <GallerySkeleton count={8} />,
  ssr: false
});

export default function GalleryPage() {
  const { 
    restaurantData, 
    isOwner, 
    hasAccessToRestaurant, 
    isLoading
  } = useRestaurantAccess();
  const updateRestaurant = useUpdateRestaurant().mutateAsync;
  const [galleryImages, setGalleryImages] = useState<Media[]>([]);
  const [originalImages, setOriginalImages] = useState<Media[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Check if user has access to this restaurant
  const hasAccess = restaurantData?._id
    ? isOwner || hasAccessToRestaurant(restaurantData._id)
    : false;

  // Initialize gallery images from restaurant data
  useEffect(() => {
    if (restaurantData?.gallery) {
      setGalleryImages(restaurantData.gallery);
      setOriginalImages(restaurantData.gallery);
      setHasUnsavedChanges(false);
      setSaveError(null);
    } else {
      setGalleryImages([]);
      setOriginalImages([]);
      setHasUnsavedChanges(false);
      setSaveError(null);
    }
  }, [restaurantData?.gallery]);

  const handleImagesChange = useCallback((images: Media[]) => {
    setGalleryImages(images);
    setHasUnsavedChanges(true);
    setSaveError(null); // Clear any previous save errors
  }, []);

  const handleSave = useCallback(async () => {
    if (!restaurantData?._id || !hasUnsavedChanges) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await updateRestaurant({
        id: restaurantData._id,
        data: {
          ...restaurantData,
          gallery: galleryImages,
        },
      });
      
      setOriginalImages(galleryImages);
      setHasUnsavedChanges(false);
      setSaveError(null);
      toast.success("Gallery updated successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update gallery. Please try again.";
      setSaveError(errorMessage);
      toast.error(errorMessage);
      
    } finally {
      setIsSaving(false);
    }
  }, [restaurantData, galleryImages, hasUnsavedChanges, updateRestaurant]);

  const handleCancel = useCallback(() => {
    // Confirm before discarding changes if there are unsaved changes
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmed) return;
    }

    setGalleryImages(originalImages);
    setHasUnsavedChanges(false);
    setSaveError(null);
    toast.info("Changes discarded");
  }, [hasUnsavedChanges, originalImages]);

  // Auto-save functionality (optional - can be enabled/disabled)
  const [autoSave, setAutoSave] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoSave && hasUnsavedChanges && !isSaving) {
      // Clear existing timeout
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      // Set new timeout for auto-save
      const timeout = setTimeout(() => {
        handleSave();
      }, 5000); // Auto-save after 5 seconds of inactivity

      setAutoSaveTimeout(timeout);

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [autoSave, hasUnsavedChanges, isSaving, handleSave, autoSaveTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  // Show loading state while checking access
  if (isLoading) {
    return (
      <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-foreground">Loading gallery...</p>
          </div>
        </div>
      </main>
    );
  }

  // Check if user has access to this restaurant
  if (!restaurantData?._id) {
    return (
      <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            No Restaurant Found
          </h1>
          <p className="text-foreground text-sm">
            You don&apos;t have access to any restaurant gallery.
          </p>
        </div>
      </main>
    );
  }

  // Check if user has permission to access this gallery
  if (!hasAccess) {
    return (
      <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-foreground text-sm">
            You don&apos;t have permission to access this restaurant&apos;s
            gallery.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
        <p className="text-foreground text-sm mt-2">
          Manage your restaurant&apos;s photo gallery and media content
        </p>
      </div>

      <Suspense fallback={<GallerySkeleton count={8} />}>
        <Gallery
          images={galleryImages}
          onImagesChange={handleImagesChange}
          restaurantId={restaurantData._id}
        />
      </Suspense>

      {/* Save/Cancel Actions */}
      {hasUnsavedChanges && (
        <div className="space-y-4 pt-6 border-t">
          {/* Error Display */}
          {saveError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Save Failed
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    {saveError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Auto-save Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="auto-save"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="auto-save" className="text-sm text-foreground">
                Auto-save changes after 5 seconds
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                text="Discard Changes"
                onClick={handleCancel}
                disabled={isSaving}
                variant="solid"
                color="danger"
                size="sm"
              />
              <Button
                text={isSaving ? 'Saving...' : 'Save Changes'}
                onClick={handleSave}
                disabled={isSaving}
                variant="solid"
                color="primary"
                size="sm"
              />

            </div>
          </div>
        </div>
      )}
    </main>
  );
}

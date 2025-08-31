import type { Media } from "@shared/types";
import { useCallback, useEffect, useState } from "react";

interface UseGalleryStateProps {
  initialImages: Media[];
  onImagesChange: (images: Media[]) => void;
}

interface UseGalleryStateReturn {
  // Current state
  images: Media[];
  filteredImages: Media[];
  hasUnsavedChanges: boolean;
  isUploading: boolean;
  
  // Actions
  addImages: (newImages: Media[]) => void;
  removeImage: (imageId: string) => void;
  updateImageMetadata: (imageId: string, field: string, value: string) => void;
  filterImages: (category: string, tags: string[]) => void;
  saveChanges: () => Promise<{ success: boolean; error?: unknown }>;
  discardChanges: () => void;
  resetUploadState: () => void;
  
  // Upload state
  setUploading: (uploading: boolean) => void;
}

export const useGalleryState = ({ 
  initialImages, 
  onImagesChange 
}: UseGalleryStateProps): UseGalleryStateReturn => {
  // Core state
  const [images, setImages] = useState<Media[]>(initialImages);
  const [originalImages, setOriginalImages] = useState<Media[]>(initialImages);
  const [filteredImages, setFilteredImages] = useState<Media[]>(initialImages);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Filter state
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  // Sync with parent when initialImages change
  useEffect(() => {
    setImages(initialImages);
    setOriginalImages(initialImages);
    setFilteredImages(initialImages);
    setHasUnsavedChanges(false);
  }, [initialImages]);

  // Update filtered images when filters or images change
  useEffect(() => {
    const filtered = images.filter((image) => {
      // If no category is selected, show all images
      if (!currentCategory) {
        // Only apply tag filtering if tags are selected
        if (currentTags.length > 0) {
          const hasMatchingTag = image.tags?.some((tag) => currentTags.includes(tag)) ?? false;
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
        const hasMatchingTag = image.tags?.some((tag) => currentTags.includes(tag)) ?? false;
        return hasMatchingTag;
      }
      
      return true;
    });
    
    setFilteredImages(filtered);
  }, [images, currentCategory, currentTags]);

  // Sync with parent when images change (but not from initial sync)
  useEffect(() => {
    if (images !== originalImages && images.length > 0) {
      setHasUnsavedChanges(true);
      onImagesChange(images);
    }
  }, [images, originalImages, onImagesChange]);

  // Add new images (from uploads)
  const addImages = useCallback((newImages: Media[]) => {
    setImages(prev => [...prev, ...newImages]);
  }, []);

  // Remove image
  const removeImage = useCallback((imageId: string) => {
    setImages(prev => prev.filter(img => img._id !== imageId));
  }, []);

  // Update image metadata
  const updateImageMetadata = useCallback((imageId: string, field: string, value: string) => {
    setImages(prev => prev.map(img => {
      if (img._id === imageId) {
        return {
          ...img,
          [field]: field === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
        };
      }
      return img;
    }));
  }, []);

  // Filter images
  const filterImages = useCallback((category: string, tags: string[]) => {
    setCurrentCategory(category);
    setCurrentTags(tags);
  }, []);

  // Save changes (persist to backend)
  const saveChanges = useCallback(async () => {
    if (!hasUnsavedChanges) {
      return { success: true };
    }
    
    try {
      setOriginalImages(images);
      setHasUnsavedChanges(false);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [hasUnsavedChanges, images]);

  // Discard changes (rollback to original)
  const discardChanges = useCallback(() => {
    setImages(originalImages);
    setHasUnsavedChanges(false);
  }, [originalImages]);

  // Reset upload state
  const resetUploadState = useCallback(() => {
    setIsUploading(false);
  }, []);

  return {
    // State
    images,
    filteredImages,
    hasUnsavedChanges,
    isUploading,
    
    // Actions
    addImages,
    removeImage,
    updateImageMetadata,
    filterImages,
    saveChanges,
    discardChanges,
    resetUploadState,
    
    // Upload state
    setUploading: setIsUploading,
  };
};

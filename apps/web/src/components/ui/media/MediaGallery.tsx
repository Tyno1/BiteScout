"use client";

import { Button, IconButton } from "@/components/atoms";
import { useMediaWithOptimizedUrl } from "@/hooks/media";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageFullscreen } from "../dashboard";

interface MediaGalleryProps {
  mediaIds: string[];
  altText?: string;
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const MediaGallery = ({
  mediaIds,
  altText = "Gallery image",
  className = "",
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}: MediaGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use React Query hooks for each media item
  const currentMediaId = mediaIds[currentIndex];
  const {
    data: currentMediaData,
    isLoading: currentLoading,
    error: currentError,
  } = useMediaWithOptimizedUrl(currentMediaId, "medium");

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || mediaIds.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaIds.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, mediaIds.length]);

  // Escape key handler for fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isFullscreen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaIds.length) % mediaIds.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaIds.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!mediaIds || mediaIds.length === 0) {
    return (
      <div
        className={`aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-lg border shadow-inner ${className}`}
      >
        No images available
      </div>
    );
  }

  const currentUrl =
    currentMediaData?.optimizedUrl || currentMediaData?.media?.url || "/api/placeholder/400/300";
  const currentAlt =
    currentMediaData?.media?.title || currentMediaData?.media?.description || altText;

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-sm">
        {currentLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse">
            <div className="w-full h-full bg-gray-300" />
          </div>
        ) : currentError ? (
          <div className="w-full h-full bg-red-50 flex items-center justify-center">
            <p className="text-red-600 text-sm">Failed to load image</p>
          </div>
        ) : (
          <Image src={currentUrl} alt={currentAlt} fill className="object-cover" />
        )}

        {/* Navigation Controls */}
        {mediaIds.length > 1 && (
          <>
            {/* Previous Button */}
            <IconButton
              variant="glass"
              color="neutral"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              icon={<ChevronLeft size={20} />}
            />

            {/* Next Button */}
            <IconButton
              variant="glass"
              color="neutral"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              icon={<ChevronRight size={20} />}
            />
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {mediaIds.length}
        </div>

        {/* Fullscreen Toggle */}
        <Button
          variant="glass"
          color="neutral"
          size="sm"
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white border-0"
          text="Fullscreen"
        />
      </div>

      {/* Thumbnails */}
      {showThumbnails && mediaIds.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {mediaIds.map((mediaId, index) => (
              <ThumbnailItem
                key={mediaId}
                mediaId={mediaId}
                index={index}
                currentIndex={currentIndex}
                altText={altText}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && currentMediaData?.media && (
        <ImageFullscreen image={currentMediaData.media} onClose={() => setIsFullscreen(false)} />
      )}
    </div>
  );
};

// Separate component for thumbnails to use React Query hooks
const ThumbnailItem = ({
  mediaId,
  index,
  currentIndex,
  altText,
  onClick,
}: {
  mediaId: string;
  index: number;
  currentIndex: number;
  altText: string;
  onClick: () => void;
}) => {
  const { data: mediaData, isLoading, error } = useMediaWithOptimizedUrl(mediaId, "small");

  const thumbnailUrl =
    mediaData?.optimizedUrl || mediaData?.media?.url || "/api/placeholder/400/300";
  const thumbnailAlt =
    mediaData?.media?.title || mediaData?.media?.description || `${altText} thumbnail ${index + 1}`;

  return (
    <button
      type="button"
      className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 ${
        index === currentIndex ? "ring-2 ring-blue-500 ring-offset-2" : "hover:opacity-80"
      }`}
      onClick={onClick}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse">
            <div className="w-full h-full bg-gray-300" />
          </div>
        ) : error ? (
          <div className="w-full h-full bg-red-50 flex items-center justify-center">
            <div className="w-4 h-4 bg-red-300 rounded" />
          </div>
        ) : (
          <Image src={thumbnailUrl} alt={thumbnailAlt} fill className="object-cover" />
        )}
      </div>
      {index === currentIndex && <div className="absolute inset-0 bg-blue-500/20 rounded-lg" />}
    </button>
  );
};

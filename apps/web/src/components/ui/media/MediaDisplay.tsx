"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import { useMediaWithOptimizedUrl } from "@/hooks/media";

interface MediaDisplayProps {
  mediaId: string;
  size?: string;
  networkSpeed?: "slow" | "medium" | "fast";
  showTitle?: boolean;
  showDescription?: boolean;
  className?: string;
  imageHeight?: string;
  priority?: boolean;
}

export const MediaDisplay = memo(
  ({
    mediaId,
    size = "medium",
    networkSpeed,
    showTitle = true,
    showDescription = true,
    className = "",
    imageHeight = "h-64",
    priority = false,
  }: MediaDisplayProps) => {
    const { data, isLoading, error, isError } = useMediaWithOptimizedUrl(
      mediaId,
      size as "small" | "medium" | "large",
      networkSpeed
    );

    // Memoize display URL to prevent unnecessary re-renders
    const displayUrl = useMemo(
      () => data?.optimizedUrl || data?.media?.url || "",
      [data?.optimizedUrl, data?.media?.url]
    );

    // Memoize loading state
    const loadingState = useMemo(
      () => (
        <div className={`animate-pulse ${className}`}>
          <div className={`bg-gray-200 rounded-lg ${imageHeight} w-full`} />
        </div>
      ),
      [className, imageHeight]
    );

    // Memoize error state
    const errorState = useMemo(
      () => (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
          <p className="text-red-600 text-sm">Error loading media: {error?.message}</p>
        </div>
      ),
      [className, error]
    );

    // Memoize not found state
    const notFoundState = useMemo(
      () => (
        <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
          <p className="text-gray-500 text-sm">Media not found</p>
        </div>
      ),
      [className]
    );

    if (isLoading) {
      return loadingState;
    }

    if (isError || error) {
      return errorState;
    }

    if (!data?.media) {
      return notFoundState;
    }

    return (
      <div className={`space-y-2 ${className}`}>
        {/* Media Content */}
        <div className="relative">
          {data.media.type === "image" ? (
            <div className={`relative w-full ${imageHeight} rounded-lg overflow-hidden`}>
              <Image
                src={displayUrl}
                alt={data.media.title || "Media content"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                priority={priority}
                quality={85}
              />
            </div>
          ) : (
            <video
              src={displayUrl}
              controls
              className="w-full h-auto rounded-lg"
              preload="metadata"
            >
              <source src={displayUrl} type={data.media.mimeType} />
              <track kind="captions" src="" label="English" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Verification Badge */}
          {data.media.verified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Media Info */}
        {(showTitle || showDescription) && (
          <div className="space-y-1">
            {showTitle && data.media.title && (
              <h3 className="font-medium text-gray-900">{data.media.title}</h3>
            )}
            {showDescription && data.media.description && (
              <p className="text-sm text-gray-600">{data.media.description}</p>
            )}
          </div>
        )}

        {/* Media Metadata */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Type: {data.media.type}</span>
            {data.media.fileSize && (
              <span>{(data.media.fileSize / 1024 / 1024).toFixed(2)} MB</span>
            )}
          </div>
          {data.media.dimensions && (
            <div className="flex justify-between">
              <span>
                Dimensions: {data.media.dimensions.width} × {data.media.dimensions.height}
              </span>
              <span>Size: {size}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MediaDisplay.displayName = "MediaDisplay";

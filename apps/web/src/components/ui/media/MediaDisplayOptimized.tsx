import { useMediaWithOptimizedUrl } from "@/hooks/media";
import { memo } from "react";

interface MediaDisplayOptimizedProps {
  mediaId: string;
  size?: "small" | "medium" | "large";
  networkSpeed?: "slow" | "medium" | "fast";
  showTitle?: boolean;
  showDescription?: boolean;
  className?: string;
  imageHeight?: string;
  priority?: boolean;
  fallbackUrl?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const MediaDisplayOptimized = memo(({
  mediaId,
  size = "medium",
  networkSpeed,
  showTitle = true,
  showDescription = true,
  className = "",
  imageHeight = "h-64",
  priority = false,
  fallbackUrl,
  onLoad,
  onError,
}: MediaDisplayOptimizedProps) => {
  const { 
    data, 
    isLoading, 
    error, 
    isError 
  } = useMediaWithOptimizedUrl(mediaId, size, networkSpeed);

  // Handle loading state
  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`bg-gray-200 rounded-lg ${imageHeight} w-full`} />
      </div>
    );
  }

  // Handle error state
  if (isError || error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to load media";
    
    if (onError) {
      onError(error instanceof Error ? error : new Error(errorMessage));
    }

    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-600 text-sm">Error loading media: {errorMessage}</p>
        {fallbackUrl && (
          <img 
            src={fallbackUrl} 
            alt="Fallback" 
            className={`${imageHeight} w-full object-cover rounded-lg mt-2`}
          />
        )}
      </div>
    );
  }

  // Handle no data state
  if (!data) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
        <p className="text-gray-600 text-sm">No media found</p>
      </div>
    );
  }

  const { media, optimizedUrl } = data;
  const displayUrl = optimizedUrl || media.url || fallbackUrl;

  if (!displayUrl) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
        <p className="text-gray-600 text-sm">No image URL available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={displayUrl}
        alt={media.title || "Media"}
        className={`${imageHeight} w-full object-cover rounded-lg`}
        loading={priority ? "eager" : "lazy"}
        onLoad={onLoad}
        onError={() => {
          if (onError) {
            onError(new Error("Failed to load image"));
          }
        }}
      />
      
      {(showTitle && media.title) || (showDescription && media.description) ? (
        <div className="mt-2 space-y-1">
          {showTitle && media.title && (
            <h3 className="text-sm font-medium text-gray-900">{media.title}</h3>
          )}
          {showDescription && media.description && (
            <p className="text-xs text-gray-500">{media.description}</p>
          )}
        </div>
      ) : null}
    </div>
  );
});

MediaDisplayOptimized.displayName = "MediaDisplayOptimized"; 
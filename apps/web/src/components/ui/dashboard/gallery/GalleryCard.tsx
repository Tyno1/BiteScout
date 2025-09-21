import { Button, IconButton } from "@/components/atoms";
import type { Media } from "@shared/types";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryCardProps {
  image: Media;
  onFullscreen: (image: Media) => void;
  priority?: boolean;
  onUseImage?: (image: Media) => void;
}

export const GalleryCard = ({
  image,
  onFullscreen,
  priority = false,
  onUseImage,
}: GalleryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isCardFocused, setIsCardFocused] = useState(false);

  // Detect if device supports touch
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    // Also check on resize in case device orientation changes
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  // Handle tap to reveal buttons on touch devices
  const handleImageTap = () => {
    if (isTouchDevice) {
      setShowButtons(!showButtons);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
      {/* Image Preview */}
      <button
        type="button"
        className="aspect-square rounded-t-xl overflow-hidden relative group cursor-pointer w-full border-0 p-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
        onClick={handleImageTap}
        onFocus={() => setIsCardFocused(true)}
        onBlur={() => setIsCardFocused(false)}
        aria-label="Tap to reveal image options"
      >
        {image.type === "image" ? (
          <>
            {/* Loading Placeholder */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Error Placeholder */}
            {imageError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">!</span>
                  </div>
                  <p className="text-xs">Failed to load</p>
                </div>
              </div>
            )}

            <Image
              src={image.url || ""}
              alt={image.title || "Gallery image"}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              quality={priority ? 90 : 75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {/* Fullscreen Button */}
            <IconButton
              icon={<Maximize2 size={16} />}
              variant="glass"
              color="primary"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onFullscreen(image);
              }}
              className={`absolute top-2 right-2 transition-opacity duration-200 ${
                isCardFocused || (isTouchDevice && showButtons)
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
              ariaLabel="View fullscreen"
            />

            {/* Use This Image Button */}
            {onUseImage && (
              <Button
                text="Use This Image"
                variant="glass"
                color="primary"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onUseImage(image);
                }}
                className={`absolute bottom-2 left-2 transition-opacity duration-200 ${
                  isCardFocused || (isTouchDevice && showButtons)
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                ariaLabel="Use this image"
              />
            )}

            {/* Touch Device Indicator - Show a subtle hint */}
            {isTouchDevice && !showButtons && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 opacity-0 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            )}
          </>
        ) : image.type === "video" ? (
          <video
            src={image.url}
            className="w-full h-full object-cover"
            muted
            loop
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-sm text-gray-600">?</span>
              </div>
              <p className="text-xs">File preview not available</p>
            </div>
          </div>
        )}
      </button>

      {/* Image Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-foreground truncate mb-1">
          {image.title || "Untitled"}
        </p>
        {image.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{image.description}</p>
        )}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {image.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                +{image.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

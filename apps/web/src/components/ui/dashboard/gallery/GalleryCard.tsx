import { IconButton } from "@/components/atoms";
import type { Media } from "@shared/types";
import { FileText, Maximize2 } from "lucide-react";
import Image from "next/image";

interface GalleryCardProps {
  image: Media;
  onFullscreen: (image: Media) => void;
}

export const GalleryCard = ({ image, onFullscreen }: GalleryCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
      {/* Image Preview */}
      <div className="aspect-square rounded-t-xl overflow-hidden relative group">
        {image.type === "image" ? (
          <>
            <Image
              src={image.url}
              alt={image.title || "Gallery image"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* Fullscreen Button */}
            <IconButton
              icon={<Maximize2 size={16} />}
              variant="glass"
              color="primary"
              size="xs"
              onClick={() => onFullscreen(image)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              ariaLabel="View fullscreen"
            />
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
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xs">File preview not available</p>
            </div>
          </div>
        )}
      </div>

      {/* Image Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-foreground truncate mb-1">
          {image.title || "Untitled"}
        </p>
        {image.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {image.description}
          </p>
        )}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {image.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
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

import { IconButton } from "@/components/atoms";
import type { Media } from "@shared/types";
import { FileText, X } from "lucide-react";
import Image from "next/image";

interface ImageFullscreenProps {
  image: Media | null;
  onClose: () => void;
}

export const ImageFullscreen = ({ image, onClose }: ImageFullscreenProps) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-full max-h-full">
        {/* Close Button */}
        <IconButton
          icon={<X size={20} />}
          variant="glass"
          color="primary"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
          ariaLabel="Close fullscreen"
        />

        {/* Image/Video/File */}
        {image.type === "image" ? (
          <Image
            src={image.url || ""}
            alt={image.title || "Fullscreen image"}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain"
            sizes="100vw"
          />
        ) : image.type === "video" ? (
          <video src={image.url || ""} className="max-w-full max-h-full" controls autoPlay muted />
        ) : (
          <div className="text-white text-center">
            <FileText className="w-24 h-24 mx-auto mb-4" />
            <p>File preview not available in fullscreen</p>
          </div>
        )}

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          {image.title && <h3 className="text-lg font-semibold mb-2">{image.title}</h3>}
          {image.description && <p className="text-sm opacity-90 mb-2">{image.description}</p>}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs bg-white/20 text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import type { Media } from "shared/types/api/schemas";

// Utility function to get media URL with fallback
export const getMediaUrl = (
  media?: Media | Media[] | null,
  fallback?: string
): string => {
  if (!media) return fallback || "/api/placeholder/400/300";

  if (Array.isArray(media)) {
    return media[0]?.url || fallback || "/api/placeholder/400/300";
  }

  return media.url || fallback || "/api/placeholder/400/300";
};

// Utility function to get media alt text
export const getMediaAlt = (
  media?: Media | Media[] | null,
  fallback?: string
): string => {
  if (!media) return fallback || "Image";

  if (Array.isArray(media)) {
    return media[0]?.title || media[0]?.description || fallback || "Image";
  }

  return media.title || media.description || fallback || "Image";
};

// Utility function to check if media is an image
export const isImage = (media?: Media | Media[] | null): boolean => {
  if (!media) return false;

  if (Array.isArray(media)) {
    return media[0]?.type === "image";
  }

  return media.type === "image";
};

// Utility function to check if media is a video
export const isVideo = (media?: Media | Media[] | null): boolean => {
  if (!media) return false;

  if (Array.isArray(media)) {
    return media[0]?.type === "video";
  }

  return media.type === "video";
};

// Utility function to check if media is audio
export const isAudio = (media?: Media | Media[] | null): boolean => {
  if (!media) return false;

  if (Array.isArray(media)) {
    return media[0]?.type === "audio";
  }

  return media.type === "audio";
}; 
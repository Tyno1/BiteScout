import type { Media } from "shared/types/api/schemas";
import { getMedia } from "./mediaApi";

// Utility function to get media URL with fallback
export const getMediaUrl = async (
  mediaId?: string | string[],
  fallback?: string
): Promise<string> => {
  if (!mediaId) return fallback || "/api/placeholder/400/300";

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return fallback || "/api/placeholder/400/300";
    try {
      const media = await getMedia(mediaId[0]);
      return media.url || fallback || "/api/placeholder/400/300";
    } catch (error) {
      return fallback || "/api/placeholder/400/300";
    }
  }

  try {
    const media = await getMedia(mediaId);
    return media.url || fallback || "/api/placeholder/400/300";
  } catch (error) {
    return fallback || "/api/placeholder/400/300";
  }
};

// Utility function to get media alt text
export const getMediaAlt = async (
  mediaId?: string | string[] | null,
  fallback?: string
): Promise<string> => {
  if (!mediaId) return fallback || "Image";

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return fallback || "Image";
    try {
      const media = await getMedia(mediaId[0]);
      return media.title || media.description || fallback || "Image";
    } catch (error) {
      return fallback || "Image";
    }
  }

  try {
    const media = await getMedia(mediaId);
    return media.title || media.description || fallback || "Image";
  } catch (error) {
    return fallback || "Image";
  }
};

// Utility function to check if media is an image
export const isImage = async (mediaId?: string | string[] | null): Promise<boolean> => {
  if (!mediaId) return false;

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return false;
    try {
      const media = await getMedia(mediaId[0]);
      return media.type === "image";
    } catch (error) {
      return false;
    }
  }

  try {
    const media = await getMedia(mediaId);
    return media.type === "image";
  } catch (error) {
    return false;
  }
};

// Utility function to check if media is a video
export const isVideo = async (mediaId?: string | string[] | null): Promise<boolean> => {
  if (!mediaId) return false;

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return false;
    try {
      const media = await getMedia(mediaId[0]);
      return media.type === "video";
    } catch (error) {
      return false;
    }
  }

  try {
    const media = await getMedia(mediaId);
    return media.type === "video";
  } catch (error) {
    return false;
  }
};

// Utility function to check if media is audio
export const isAudio = async (mediaId?: string | string[] | null): Promise<boolean> => {
  if (!mediaId) return false;

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return false;
    try {
      const media = await getMedia(mediaId[0]);
      return media.type === "audio";
    } catch (error) {
      return false;
    }
  }

  try {
    const media = await getMedia(mediaId);
    return media.type === "audio";
  } catch (error) {
    return false;
  }
};

// Utility function to get full media object
export const getMediaObject = async (
  mediaId?: string | string[] | null
): Promise<Media | null> => {
  if (!mediaId) return null;

  if (Array.isArray(mediaId)) {
    if (mediaId.length === 0) return null;
    try {
      return await getMedia(mediaId[0]);
    } catch (error) {
      return null;
    }
  }

  try {
    return await getMedia(mediaId);
  } catch (error) {
    return null;
  }
}; 
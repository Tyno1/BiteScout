export interface MediaVariant {
  size: string;
  url: string;
  width?: number;
  height?: number;
  fileSize: number;
  format: string;
  createdAt: Date;
}

export interface MediaMetadata {
  _id?: string; // MongoDB ObjectId
  providerId: string;
  provider: string;
  originalName: string;
  format: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  variants: MediaVariant[];
  userId?: string;
  tags?: string[];
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadResponse {
  media: MediaMetadata;
  variants: MediaVariant[];
}

export interface MediaQuery {
  userId?: string;
  tags?: string[];
  type?: 'image' | 'video';
  size?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'fileSize' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface ImageVariantConfig {
  width: number;
  height: number;
  quality: number;
}

export interface VideoVariantConfig {
  bitrate: string;
  resolution: string;
}

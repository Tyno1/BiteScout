import type { CreateMediaResponse, Media } from "shared/types";

export enum MediaFolder {
  USER_PROFILE = "user-profile-images",
  POST = "post-images",
  GALLERY = "gallery-images",
  FOOD = "food-images",
  RESTAURANT = "restaurant-images",
  DISH = "dish-images",
}

export interface MediaUploadProps {
  onUploadSuccess?: (result: CreateMediaResponse | CreateMediaResponse[]) => void;
  onUploadError?: (error: string) => void;
  onRemoveUploadedFile?: (index: number) => void;
  onSelectedFilesChange?: (files: FileWithPreview[]) => void;
  onUpdateUploadedFileMetadata?: (index: number, field: string, value: string) => void;
  associatedWith?: Media["associatedWith"];
  folder?: MediaFolder;
  className?: string;
  multiple?: boolean;
  showUploadedFiles?: boolean;
  uploadedFiles?: CreateMediaResponse[];
  selectedFiles?: FileWithPreview[];
  uploadMode?: "auto" | "manual";
  editMode?: boolean;
  singleUpload?: boolean;
}

export interface FileWithPreview {
  file: File;
  previewUrl: string;
  title: string;
  description: string;
  tags: string;
  uploading: boolean;
  progress: number;
  expanded: boolean;
}

export interface FileDropZoneProps {
  files: FileWithPreview[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  onUpload: () => void;
  onClearAll: () => void;
  uploading: boolean;
  multiple: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  uploadMode?: "auto" | "manual";
  singleUpload?: boolean;
}

export interface MediaPreviewProps {
  files: FileWithPreview[];
  onRemoveFile: (index: number) => void;
  onUpdateMetadata: (index: number, field: keyof FileWithPreview, value: string | boolean) => void;
  uploading: boolean;
  multiple: boolean;
  uploadProgress?: Record<number, number>;
  uploadErrors?: Record<number, string>;
}

export interface MediaCardProps {
  fileWithPreview: FileWithPreview;
  index: number;
  onRemove: (index: number) => void;
  onUpdateMetadata: (index: number, field: keyof FileWithPreview, value: string | boolean) => void;
  uploading: boolean;
}

export interface MediaMetadataFormProps {
  fileWithPreview: FileWithPreview;
  index: number;
  onUpdateMetadata: (index: number, field: keyof FileWithPreview, value: string | boolean) => void;
  uploading: boolean;
}

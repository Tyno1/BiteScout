"use client";

import { MediaCard } from "./MediaCard";
import type { MediaPreviewProps } from "./types";

export const MediaPreview = ({
  files,
  onRemoveFile,
  onUpdateMetadata,
  uploading,
}: MediaPreviewProps) => {
  if (files.length === 0) return null;

  return (
    <div className="border border-primary/30 rounded-lg p-4 bg-background shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">File Preview & Details</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((fileWithPreview, index) => (
          <MediaCard
            key={`${fileWithPreview.file.name}-${index}`}
            fileWithPreview={fileWithPreview}
            index={index}
            onRemove={onRemoveFile}
            onUpdateMetadata={onUpdateMetadata}
            uploading={uploading}
          />
        ))}
      </div>
    </div>
  );
};

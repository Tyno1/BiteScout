"use client";

import { Input, Textarea } from "@/components/atoms";
import type { MediaMetadataFormProps } from "./types";

export const MediaMetadataForm = ({
  fileWithPreview,
  index,
  onUpdateMetadata,
}: MediaMetadataFormProps) => {
  return (
    <div className="bg-card p-3 rounded-b-xl">
      <div className="space-y-2">
        <Input
          name={`title-${index}`}
          type="text"
          label="Title"
          value={fileWithPreview.title}
          onChange={(e) => onUpdateMetadata(index, "title", e.target.value)}
          placeholder="Enter a title for your media"
          fullWidth
        />
        
        <Textarea
          name={`description-${index}`}
          fullWidth
          label="Description"
          value={fileWithPreview.description}
          onChange={(e) => onUpdateMetadata(index, "description", e.target.value)}
          placeholder="Enter a description (optional)"
          rows={2}
        />
        
        <Input
          name={`tags-${index}`}
          type="text"
          label="Tags"
          value={fileWithPreview.tags}
          onChange={(e) => onUpdateMetadata(index, "tags", e.target.value)}
          placeholder="Enter tags separated by commas (optional)"
          fullWidth
        />

        {/* Individual Progress Bar */}
        {fileWithPreview.uploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-card-foreground">
              <span>Uploading...</span>
              <span>{fileWithPreview.progress}%</span>
            </div>
            <div className="w-full bg-card rounded-full h-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${fileWithPreview.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 
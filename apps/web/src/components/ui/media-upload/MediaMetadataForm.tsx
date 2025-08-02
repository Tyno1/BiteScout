"use client";

import { Input, Textarea } from "@/components/atoms";
import type { MediaMetadataFormProps } from "./types";

export const MediaMetadataForm = ({
  fileWithPreview,
  index,
  onUpdateMetadata,
}: MediaMetadataFormProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-b-xl">
      <div className="space-y-2">
        <Input
          name={`title-${index}`}
          type="text"
          label="Title"
          value={fileWithPreview.title}
          onChange={(e) => onUpdateMetadata(index, "title", e.target.value)}
          placeholder="Enter a title for your media"
          className="bg-white text-sm p-2 w-full shadow-sm"
        />
        
        <Textarea
          name={`description-${index}`}
          label="Description"
          value={fileWithPreview.description}
          onChange={(e) => onUpdateMetadata(index, "description", e.target.value)}
          placeholder="Enter a description (optional)"
          rows={2}
          className="bg-white text-sm p-2 w-full shadow-sm"
        />
        
        <Input
          name={`tags-${index}`}
          type="text"
          label="Tags"
          value={fileWithPreview.tags}
          onChange={(e) => onUpdateMetadata(index, "tags", e.target.value)}
          placeholder="Enter tags separated by commas (optional)"
          className="bg-white text-sm p-2 w-full shadow-sm"
        />

        {/* Individual Progress Bar */}
        {fileWithPreview.uploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Uploading...</span>
              <span>{fileWithPreview.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
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
"use client";

import { Button, IconButton } from "@/components/atoms";
import { X } from "lucide-react";
import { MediaMetadataForm } from "./MediaMetadataForm";
import type { MediaCardProps } from "./types";

export const MediaCard = ({
  fileWithPreview,
  index,
  onRemove,
  onUpdateMetadata,
  uploading,
}: MediaCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
      {/* Cancel Button - Floating action style */}
      <IconButton
        variant="solid"
        color="danger"
        size="xs"
        onClick={() => onRemove(index)}
        disabled={uploading}
        className="absolute -top-3 -right-4 rounded-full"
        icon={<X size={12} />}
      />
      
      {/* Landscape Card Layout */}
      <div className="flex h-32">
        {/* Left: Preview Image/Video */}
        <div className="w-1/2 p-2">
          <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden">
            {fileWithPreview.file.type.startsWith("image/") ? (
              <img
                src={fileWithPreview.previewUrl}
                alt={`Preview of ${fileWithPreview.file.name}`}
                className="w-full h-full object-contain"
              />
            ) : fileWithPreview.file.type.startsWith("video/") ? (
              <video
                src={fileWithPreview.previewUrl}
                controls
                className="w-full h-full object-contain"
              >
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <div className="text-center">
                  <svg
                    className="w-6 h-6 text-gray-400 mx-auto mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                    />
                  </svg>
                  <p className="text-xs text-gray-500">File preview not available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: File Info & Controls */}
        <div className="w-1/2 p-2 flex flex-col justify-between">
          <div>
            <div className="mb-1">
              <h4 className="text-xs font-medium text-foreground truncate">
                {fileWithPreview.file.name}
              </h4>
            </div>
            
            {/* File Info */}
            <div className="text-xs text-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-foreground font-medium">
                  {fileWithPreview.file.type.split('/')[1]?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="text-foreground font-medium">
                  {(fileWithPreview.file.size / 1024 / 1024).toFixed(1)}MB
                </span>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <Button
            text={fileWithPreview.expanded ? "Hide Details" : "Show Details"}
            variant="outline"
            size="xs"
            onClick={() => onUpdateMetadata(index, "expanded", !fileWithPreview.expanded)}
          />
        </div>
      </div>

      {/* Collapsible Form Section */}
      {fileWithPreview.expanded && (
        <MediaMetadataForm
          fileWithPreview={fileWithPreview}
          index={index}
          onUpdateMetadata={onUpdateMetadata}
          uploading={uploading}
        />
      )}
    </div>
  );
}; 
"use client";

import { Button, IconButton } from "@/components/atoms";
import { Input, Textarea } from "@/components/atoms";
import { Edit3, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { UploadMediaResponse } from "shared/types";

interface UploadedFilesListProps {
  uploadedFiles: UploadMediaResponse[];
  onRemoveFile?: (index: number) => void;
  onUpdateMetadata?: (index: number, field: string, value: string) => void;
  editMode?: boolean;
}

export const UploadedFilesList = ({ 
  uploadedFiles, 
  onRemoveFile, 
  onUpdateMetadata, 
  editMode = false 
}: UploadedFilesListProps) => {
  const [expandedFiles, setExpandedFiles] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFiles(newExpanded);
  };

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="border border-primary/30 rounded-lg p-4 bg-background shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">Uploaded Files</h3>
        <span className="text-sm text-secondary">{uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={`${file._id}-${index}`} className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
            {/* Remove Button */}
            {onRemoveFile && (
              <IconButton
                variant="solid"
                color="danger"
                size="xs"
                onClick={() => onRemoveFile(index)}
                className="absolute -top-3 -right-4 rounded-full"
                icon={<X size={12} />}
              />
            )}
            
            {/* File Card */}
            <div className="flex h-32">
              {/* Left: Preview */}
              <div className="w-1/2 p-2">
                <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                  {file.type === "image" ? (
                    <Image
                      src={file.url}
                      alt={file.title || "Uploaded image"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : file.type === "video" ? (
                    <video
                      src={file.url}
                      controls
                      className="w-full h-full object-contain"
                    >
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-card">
                      <div className="text-center">
                        <svg
                          className="w-6 h-6 text-card-foreground mx-auto mb-1"
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

              {/* Right: File Info */}
              <div className="w-1/2 p-2 flex flex-col justify-between">
                <div>
                  <div className="mb-1">
                    <h4 className="text-xs font-medium text-foreground truncate">
                      {file.title || "Untitled"}
                    </h4>
                  </div>
                  
                  {/* File Info */}
                  <div className="text-xs text-card-foreground space-y-0.5">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="text-foreground font-medium">{file.type.toUpperCase()}</span>
                    </div>
                    {file.fileSize && (
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="text-foreground font-medium">{(file.fileSize / 1024 / 1024).toFixed(1)}MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Link */}
                <Button
                  variant="outline"
                  size="xs"
                  text="View"
                  IconBefore={<ExternalLink size={10} />}
                  onClick={() => window.open(file.url, "_blank")}
                />

                {/* Edit Button - Only shown in edit mode */}
                {editMode && onUpdateMetadata && (
                  <Button
                    variant="outline"
                    size="xs"
                    text={expandedFiles.has(index) ? "Hide" : "Edit"}
                    IconBefore={<Edit3 size={10} />}
                    onClick={() => toggleExpanded(index)}
                    className="mt-1"
                  />
                )}
              
              </div>
            </div>

            {/* Metadata Editing Form - Only shown when expanded and in edit mode */}
            {editMode && expandedFiles.has(index) && onUpdateMetadata && (
              <div className="bg-card p-3 rounded-b-xl border-t">
                <div className="space-y-2">
                  <Input
                    name={`title-${index}`}
                    type="text"
                    label="Title"
                    value={file.title || ""}
                    onChange={(e) => onUpdateMetadata(index, "title", e.target.value)}
                    placeholder="Enter a title for your media"
                    fullWidth
                  />
                  
                  <Textarea
                    name={`description-${index}`}
                    fullWidth
                    label="Description"
                    value={file.description || ""}
                    onChange={(e) => onUpdateMetadata(index, "description", e.target.value)}
                    placeholder="Enter a description (optional)"
                    rows={2}
                  />
                  
                  <Input
                    name={`tags-${index}`}
                    type="text"
                    label="Tags"
                    value={file.tags?.join(", ") || ""}
                    onChange={(e) => onUpdateMetadata(index, "tags", e.target.value)}
                    placeholder="Enter tags separated by commas (optional)"
                    fullWidth
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 
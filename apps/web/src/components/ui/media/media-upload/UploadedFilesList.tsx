"use client";

import { IconButton } from "@/components/atoms";
import { ExternalLink, X } from "lucide-react";
import type { UploadMediaResponse } from "shared/types";

interface UploadedFilesListProps {
  uploadedFiles: UploadMediaResponse[];
  onRemoveFile?: (index: number) => void;
}

export const UploadedFilesList = ({ uploadedFiles, onRemoveFile }: UploadedFilesListProps) => {
  if (uploadedFiles.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Uploaded Files</h3>
        <span className="text-sm text-gray-500">{uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={`${file._id}-${index}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
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
                    <img
                      src={file.url}
                      alt={file.title || "Uploaded image"}
                      className="w-full h-full object-contain"
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

              {/* Right: File Info */}
              <div className="w-1/2 p-2 flex flex-col justify-between">
                <div>
                  <div className="mb-1">
                    <h4 className="text-xs font-medium text-gray-900 truncate">
                      {file.title || "Untitled"}
                    </h4>
                  </div>
                  
                  {/* File Info */}
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="text-gray-800 font-medium">{file.type.toUpperCase()}</span>
                    </div>
                    {file.fileSize && (
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="text-gray-800 font-medium">{(file.fileSize / 1024 / 1024).toFixed(1)}MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Link */}
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1"
                >
                  <ExternalLink size={10} />
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
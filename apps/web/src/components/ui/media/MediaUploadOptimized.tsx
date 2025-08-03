import { useBatchMediaUpload, useMediaUpload } from "@/hooks/media";
import type { UploadMetadata } from "@/hooks/media/mutations/useMediaUpload";
import { useCallback, useState } from "react";
import type { FileWithPreview } from "./media-upload/types";

interface MediaUploadOptimizedProps {
  uploadMode?: "single" | "batch";
  selectedFiles?: FileWithPreview[];
  onSelectedFilesChange?: (files: FileWithPreview[]) => void;
  onUploadSuccess?: (result: unknown) => void;
  onUploadError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  metadata?: UploadMetadata;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  className?: string;
}

export const MediaUploadOptimized = ({
  uploadMode = "single",
  selectedFiles = [],
  onSelectedFilesChange,
  onUploadSuccess,
  onUploadError,
  onProgress,
  metadata,
  maxFiles = 10,
  acceptedFileTypes = ["image/*", "video/*"],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  className = "",
}: MediaUploadOptimizedProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Single file upload mutation
  const singleUploadMutation = useMediaUpload((progress) => {
    setUploadProgress(progress);
    onProgress?.(progress);
  });

  // Batch upload mutation
  const batchUploadMutation = useBatchMediaUpload((progress) => {
    setUploadProgress(progress);
    onProgress?.(progress);
  });

  // Handle file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file count
    if (selectedFiles.length + files.length > maxFiles) {
      onUploadError?.(new Error(`Maximum ${maxFiles} files allowed`));
      return;
    }

    // Validate file types and sizes
    const validFiles: FileWithPreview[] = [];
    
    for (const file of files) {
      // Check file type
      const isValidType = acceptedFileTypes.some(type => {
        if (type.endsWith("/*")) {
          const baseType = type.replace("/*", "");
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      });

      if (!isValidType) {
        onUploadError?.(new Error(`Invalid file type: ${file.type}`));
        continue;
      }

      // Check file size
      if (file.size > maxFileSize) {
        onUploadError?.(new Error(`File too large: ${file.name}`));
        continue;
      }

      // Create preview URL for images
      const previewUrl = file.type.startsWith("image/") 
        ? URL.createObjectURL(file) 
        : undefined;

      validFiles.push({
        file,
        previewUrl: previewUrl || "",
        title: file.name,
        description: "",
        tags: "",
        uploading: false,
        progress: 0,
        expanded: false,
      });
    }

    onSelectedFilesChange?.([...selectedFiles, ...validFiles]);
  }, [selectedFiles, maxFiles, acceptedFileTypes, maxFileSize, onSelectedFilesChange, onUploadError]);

  // Handle file removal
  const handleFileRemove = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onSelectedFilesChange?.(newFiles);
  }, [selectedFiles, onSelectedFilesChange]);

  // Handle upload
  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      onUploadError?.(new Error("No files selected"));
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      if (uploadMode === "single" && selectedFiles.length === 1) {
        const result = await singleUploadMutation.mutateAsync({
          file: selectedFiles[0].file,
          metadata,
        });
        onUploadSuccess?.(result);
      } else {
        const result = await batchUploadMutation.mutateAsync({
          files: selectedFiles.map(f => f.file),
          metadata,
        });
        onUploadSuccess?.(result);
      }

      // Clear selected files after successful upload
      onSelectedFilesChange?.([]);
    } catch (error) {
      onUploadError?.(error instanceof Error ? error : new Error("Upload failed"));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [
    selectedFiles,
    uploadMode,
    metadata,
    singleUploadMutation,
    batchUploadMutation,
    onUploadSuccess,
    onUploadError,
    onSelectedFilesChange,
  ]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple={uploadMode === "batch"}
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
          id="media-upload-input"
        />
        <label
          htmlFor="media-upload-input"
          className="cursor-pointer block"
        >
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              {acceptedFileTypes.join(", ")} up to {Math.round(maxFileSize / 1024 / 1024)}MB
            </p>
          </div>
        </label>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            Selected Files ({selectedFiles.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFiles.map((fileWithPreview, index) => (
              <div key={`${fileWithPreview.file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {fileWithPreview.previewUrl ? (
                    <img
                      src={fileWithPreview.previewUrl}
                      alt={fileWithPreview.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>File icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                                 <button
                   type="button"
                   onClick={() => handleFileRemove(index)}
                   disabled={isUploading}
                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <title>Remove file</title>
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {fileWithPreview.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600">Uploading...</span>
            <span className="text-blue-600 font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

             {/* Upload Button */}
       {selectedFiles.length > 0 && !isUploading && (
         <button
           type="button"
           onClick={handleUpload}
           disabled={singleUploadMutation.isPending || batchUploadMutation.isPending}
           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
         >
          {uploadMode === "single" ? "Upload File" : "Upload Files"}
        </button>
      )}

      {/* Error Display */}
      {(singleUploadMutation.error || batchUploadMutation.error) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">
            {singleUploadMutation.error?.message || batchUploadMutation.error?.message}
          </p>
        </div>
      )}
    </div>
  );
}; 
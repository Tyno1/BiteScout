"use client";

import { useMediaUpload } from "@/hooks/media";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileDropZone } from "./FileDropZone";
import { MediaPreview } from "./MediaPreview";
import { UploadedFilesList } from "./UploadedFilesList";
import type { FileWithPreview, MediaUploadProps } from "./types";

export const MediaUpload = ({
  onUploadSuccess,
  onUploadError,
  onRemoveUploadedFile,
  onSelectedFilesChange,
  onUpdateUploadedFileMetadata,
  associatedWith,
  folder,
  className = "",
  multiple = false,
  showUploadedFiles = true,
  uploadedFiles = [],
  selectedFiles,
  uploadMode = 'manual',
  editMode = false,
}: MediaUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>(selectedFiles || []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<number, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useMediaUpload();

  // Reset upload state when files change
  useEffect(() => {
    if (files.length === 0) {
      setUploadProgress({});
      setUploadErrors({});
    }
  }, [files.length]);

  const validateFile = useCallback((file: File): boolean => {
    // Validate file type
    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("video/")
    ) {
      onUploadError?.("Please select image or video files only");
      return false;
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      onUploadError?.(`File ${file.name} must be less than 100MB`);
      return false;
    }

    return true;
  }, [onUploadError]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (selectedFiles.length === 0) return;

    // Validate all files
    for (const file of selectedFiles) {
      if (!validateFile(file)) return;
    }

    const newFiles: FileWithPreview[] = selectedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      description: "",
      tags: "",
      uploading: false,
      progress: 0,
      expanded: false,
    }));

    // Always add new files to existing ones
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onSelectedFilesChange?.(updatedFiles);
  }, [files, validateFile, onSelectedFilesChange]);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      onUploadError?.("Please select files to upload");
      return;
    }

    setUploading(true);
    setUploadProgress({});
    setUploadErrors({});

    try {
      const uploadPromises = files.map(async (fileWithPreview, index) => {
        // Update individual file progress
        setUploadProgress(prev => ({ ...prev, [index]: 0 }));
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, uploading: true, progress: 0 } : f
        ));

        try {
          const result = await uploadMutation.mutateAsync({
            file: fileWithPreview.file,
            metadata: {
              title: fileWithPreview.title || undefined,
              description: fileWithPreview.description || undefined,
              tags: fileWithPreview.tags ? fileWithPreview.tags.split(',').map(tag => tag.trim()) : undefined,
              folder: folder || undefined,
              associatedWith: associatedWith,
            },
          });

          // Update progress to 100%
          setUploadProgress(prev => ({ ...prev, [index]: 100 }));
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, uploading: false, progress: 100 } : f
          ));

          // Store successful result
          return result;
        } catch (error) {
          // Update file to show error state
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, uploading: false, progress: 0 } : f
          ));
          
          const errorMessage = error instanceof Error ? error.message : "Upload failed";
          setUploadErrors(prev => ({ ...prev, [index]: errorMessage }));
          onUploadError?.(`Failed to upload ${fileWithPreview.file.name}: ${errorMessage}`);
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      
      // Call onUploadSuccess once with all results
      if (results.length > 0) {
        if (results.length === 1) {
          // Single file upload - call with single result
          onUploadSuccess?.(results[0]);
        } else {
          // Multiple files uploaded - call with array of results
          onUploadSuccess?.(results);
        }
      }
      
      // Clear files after successful upload
      for (const f of files) {
        URL.revokeObjectURL(f.previewUrl);
      }
      setFiles([]);
      onSelectedFilesChange?.([]);
    } catch (error) {
      console.error("Upload failed:", error);
      // Don't clear files on error - let user retry or remove failed files
    } finally {
      setUploading(false);
    }
  }, [files, uploadMutation, folder, associatedWith, onUploadSuccess, onUploadError, onSelectedFilesChange]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    
    if (droppedFiles.length === 0) return;

    // Validate all files
    for (const file of droppedFiles) {
      if (!validateFile(file)) return;
    }

    const newFiles: FileWithPreview[] = droppedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: "",
      tags: "",
      uploading: false,
      progress: 0,
      expanded: false,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, [validateFile]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.previewUrl);
    
    // Remove from all state arrays
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onSelectedFilesChange?.(updatedFiles);
    
    // Clean up progress and error state
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
    setUploadErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  }, [files, onSelectedFilesChange]);

  const updateFileMetadata = useCallback((index: number, field: keyof FileWithPreview, value: string | boolean) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, [field]: value } : f
    ));
  }, []);

  const handleClearAll = useCallback(() => {
    for (const f of files) {
      URL.revokeObjectURL(f.previewUrl);
    }
    setFiles([]);
          setUploadProgress({});
      setUploadErrors({});
      onSelectedFilesChange?.([]);
  }, [files, onSelectedFilesChange]);



  const handleRemoveUploadedFile = useCallback((index: number) => {
    onRemoveUploadedFile?.(index);
  }, [onRemoveUploadedFile]);

  // Retry failed uploads
  const retryFailedUploads = useCallback(async () => {
    const failedFiles = files.filter((_, index) => uploadErrors[index]);
    if (failedFiles.length === 0) return;

    // Clear errors and retry
    setUploadErrors({});
    await handleUpload();
  }, [files, uploadErrors, handleUpload]);

  return (
    <div className={`space-y-4 ${className}`}>
      <FileDropZone
        files={files}
        onFileSelect={handleFileSelect}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onUpload={handleUpload}
        onClearAll={handleClearAll}
        uploading={uploading}
        multiple={multiple}
        fileInputRef={fileInputRef}
        uploadMode={uploadMode}
      />

      {/* Error Summary */}
      {Object.keys(uploadErrors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-red-800">
              {Object.keys(uploadErrors).length} upload(s) failed
            </h4>
            <button
              type="button"
              onClick={retryFailedUploads}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Retry Failed
            </button>
          </div>
          <div className="space-y-1">
            {Object.entries(uploadErrors).map(([index, error]) => (
              <p key={index} className="text-xs text-red-600">
                {files[Number.parseInt(index, 10)]?.file.name}: {error}
              </p>
            ))}
          </div>
        </div>
      )}

      <MediaPreview
        files={files}
        onRemoveFile={handleRemoveFile}
        onUpdateMetadata={updateFileMetadata}
        uploading={uploading}
        multiple={multiple}
        uploadProgress={uploadProgress}
        uploadErrors={uploadErrors}
      />

      {/* Uploaded Files List */}
      {showUploadedFiles && (
        <UploadedFilesList
          uploadedFiles={uploadedFiles}
          onRemoveFile={handleRemoveUploadedFile}
          onUpdateMetadata={onUpdateUploadedFileMetadata}
          editMode={editMode}
        />
      )}
    </div>
  );
}; 
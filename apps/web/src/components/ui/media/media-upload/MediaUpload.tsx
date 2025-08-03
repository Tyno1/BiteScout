"use client";

import { useMediaUpload } from "@/hooks/media";
import { useRef, useState } from "react";
import { FileDropZone } from "./FileDropZone";
import { MediaPreview } from "./MediaPreview";
import { UploadedFilesList } from "./UploadedFilesList";
import type { FileWithPreview, MediaUploadProps } from "./types";

export const MediaUpload = ({
  onUploadSuccess,
  onUploadError,
  onRemoveUploadedFile,
  onSelectedFilesChange,
  associatedWith,
  folder,
  className = "",
  multiple = false,
  showUploadedFiles = true,
  uploadedFiles = [],
  selectedFiles,
  uploadMode = 'manual',
}: MediaUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>(selectedFiles || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useMediaUpload();

  const validateFile = (file: File): boolean => {
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
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      onUploadError?.("Please select files to upload");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (fileWithPreview, index) => {
        // Update individual file progress
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, uploading: true, progress: 0 } : f
        ));

        try {
          const metadata = {
            title: fileWithPreview.title || undefined,
            description: fileWithPreview.description || undefined,
            tags: fileWithPreview.tags ? fileWithPreview.tags.split(',').map(tag => tag.trim()) : undefined,
            folder: folder || undefined,
            associatedWith: associatedWith?.type && associatedWith?.id ? associatedWith : undefined,
          };

          const result = await uploadMutation.mutateAsync({
            file: fileWithPreview.file,
            metadata,
          });

          // Update progress to 100%
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, uploading: false, progress: 100 } : f
          ));

          onUploadSuccess?.(result);
          return result;
        } catch (error) {
          // Update file to show error state
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, uploading: false, progress: 0 } : f
          ));
          
          const errorMessage = error instanceof Error ? error.message : "Upload failed";
          onUploadError?.(`Failed to upload ${fileWithPreview.file.name}: ${errorMessage}`);
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      
      // Clear files after successful upload
      for (const f of files) {
        URL.revokeObjectURL(f.previewUrl);
      }
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
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
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.previewUrl);
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onSelectedFilesChange?.(updatedFiles);
  };

  const updateFileMetadata = (index: number, field: keyof FileWithPreview, value: string | boolean) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, [field]: value } : f
    ));
  };

  const handleClearAll = () => {
    for (const f of files) {
      URL.revokeObjectURL(f.previewUrl);
    }
    setFiles([]);
    onSelectedFilesChange?.([]);
  };

  const handleAddMore = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveUploadedFile = (index: number) => {
    onRemoveUploadedFile?.(index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <FileDropZone
        files={files}
        onFileSelect={handleFileSelect}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onUpload={handleUpload}
        onClearAll={handleClearAll}
        onAddMore={handleAddMore}
        uploading={uploading}
        multiple={multiple}
        fileInputRef={fileInputRef}
        uploadMode={uploadMode}
      />

      <MediaPreview
        files={files}
        onRemoveFile={handleRemoveFile}
        onUpdateMetadata={updateFileMetadata}
        onAddMore={handleAddMore}
        uploading={uploading}
        multiple={multiple}
      />

      {/* Uploaded Files List */}
      {showUploadedFiles && (
        <UploadedFilesList
          uploadedFiles={uploadedFiles}
          onRemoveFile={handleRemoveUploadedFile}
        />
      )}
    </div>
  );
}; 
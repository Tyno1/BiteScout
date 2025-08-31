"use client";

import { Button } from "@/components/atoms";
import type { FileDropZoneProps } from "./types";

export const FileDropZone = ({
  files,
  onFileSelect,
  onDrop,
  onDragOver,
  onUpload,
  onClearAll,
  uploading,
  multiple,
  fileInputRef,
  uploadMode = 'manual',
  singleUpload = false,
}: FileDropZoneProps) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        files.length > 0
          ? "border-green-500 bg-green-50"
          : "border-gray-300 hover:border-gray-400 bg-gray-50"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={onFileSelect}
        className="hidden"
        id="file-input"
        multiple={singleUpload ? false : multiple}
      />

      {!files.length ? (
        <div>
          <div className="text-gray-500 mb-4">
            <svg
              className="mx-auto h-16 w-16"
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
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {singleUpload ? "Upload Profile Image" : multiple ? "Upload Multiple Files" : "Upload Media"}
          </h3>
          <p className="text-base text-gray-600 mb-4">
            Drag and drop your {singleUpload ? "image" : "files"} here, or{" "}
            <label
              htmlFor="file-input"
              className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer underline"
            >
              browse {singleUpload ? "image" : "files"}
            </label>
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Supports images and videos up to 100MB</p>
            {!singleUpload && multiple && <p>You can select multiple files at once</p>}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-green-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </h3>
          <p className="text-base text-gray-600 mb-3">
            Total size: {(files.reduce((sum, f) => sum + f.file.size, 0) / 1024 / 1024).toFixed(2)} MB
          </p>
          <div className="flex justify-center space-x-3">
            {(!singleUpload || files.length === 0) && (
              <label
                htmlFor="file-input"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {files.length === 0 ? "Select Files" : "Select More Files"}
              </label>
            )}
            {files.length > 0 && uploadMode === 'manual' && (
              <>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={onUpload}
                  disabled={uploading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  text={uploading ? "Uploading..." : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearAll}
                  disabled={uploading}
                  className="text-gray-600 hover:text-gray-800"
                  text="Clear All"
                />
              </>
            )}
            {files.length > 0 && uploadMode === 'auto' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                disabled={uploading}
                className="text-gray-600 hover:text-gray-800"
                text="Clear All"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 
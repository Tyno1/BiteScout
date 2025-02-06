import { Edit, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Hero({
  image1,
  isEditing,
  displayData,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleImageUpload,
}: any) {
  return (
    <section
      className="relative h-[30vh] bg-black text-white flex flex-col items-start justify-center px-14"
      aria-label="Restaurant header"
    >
      <Image
        alt="Restaurant profile cover"
        src={image1}
        priority
        fill
        sizes="100vw"
        className="object-cover"
        role="img"
      />
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="z-10 w-full flex items-end justify-between">
        <div>
          <h1 className="text-6xl font-bold">
            {isEditing ? (
              <input
                type="text"
                value={displayData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full text-6xl font-bold bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-white rounded"
                aria-label="Restaurant name"
              />
            ) : (
              displayData.name
            )}
          </h1>
          <p role="contentinfo">
            {isEditing ? (
              <input
                type="text"
                value={displayData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-white rounded"
                aria-label="Restaurant description"
              />
            ) : (
              displayData.description
            )}
          </p>
        </div>
        <div className="flex gap-2" role="toolbar" aria-label="Profile actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Save changes"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Cancel editing"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Edit profile"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          <label className="cursor-pointer">
            <button
              className="inline-flex items-center justify-center px-4 py-2 border-2 rounded text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Upload new cover image"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              aria-label="Upload image"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

import { Edit, Save, Upload, X } from "lucide-react";

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
      className="relative h-[30vh] w-full bg-black text-white flex flex-col items-start justify-center px-14"
      aria-label="Restaurant header"
    >
      <img
        src={image1}
        alt="hero_image"
        className="object-cover w-full h-full absolute left-0"
      />

      <div className="absolute inset-0 bg-orange-900/70" aria-hidden="true" />
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
                placeholder="Add description here"
                value={displayData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-white rounded "
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

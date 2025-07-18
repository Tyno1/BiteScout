import { Button, Input, Select, Textarea } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { Eye, Plus, Trash2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { Media } from "@shared/types/api/schemas";
import Image from "next/image";

type GalleryProps = {
  isEditing: boolean;
  images?: Media[];
  onImagesChange?: (images: Media[]) => void;
};

// Gallery categories based on associatedWith.type
const GALLERY_CATEGORIES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "dish", label: "Food" },
  { value: "post", label: "Posts" },
];

export function Gallery({
  isEditing,
  images = [],
  onImagesChange,
}: GalleryProps) {
  const [newImage, setNewImage] = useState<Partial<Media>>({});
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addImage = useCallback(() => {
    if (!newImage.url || !newImage.type) return;

    const image: Media = {
      _id: Date.now().toString(),
      url: newImage.url,
      title: newImage.title || "",
      description: newImage.description || "",
      type: newImage.type as Media["type"],
      uploadedBy: "current-user", // This should come from session
      associatedWith: {
        type: newImage.associatedWith?.type || "restaurant",
        id: newImage.associatedWith?.id || "",
      },
    };

    onImagesChange?.([...images, image]);
    setNewImage({});
  }, [newImage, images, onImagesChange]);

  const removeImage = useCallback(
    (id: string) => {
      onImagesChange?.(images.filter((image) => image._id !== id));
    },
    [images, onImagesChange]
  );

  const handleInputChange = useCallback(
    (field: keyof Media, value: string) => {
      setNewImage((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAssociatedWithChange = useCallback(
    (field: "type" | "id", value: string) => {
      setNewImage((prev) => ({
        ...prev,
        associatedWith: {
          ...prev.associatedWith,
          [field]: value,
        },
      }));
    },
    []
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // In a real app, you'd upload to Cloudinary/S3 here
        // For now, we'll create a local URL
        const url = URL.createObjectURL(file);
        setNewImage((prev) => ({ ...prev, url }));
      }
    },
    []
  );

  const filteredImages = images.filter(
    (image) => 
      !selectedCategory || 
      image.associatedWith?.type === selectedCategory
  );

  return (
    <Card
      Component="section"
      padding="lg"
      aria-labelledby="gallery-heading"
    >
      {/* Image Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1 text-sm rounded-full border ${
              !selectedCategory
                ? "bg-gray text-gray-foreground border-gray/20"
                : "bg-gray text-gray-foreground border-gray/20"
            }`}
          >
            All
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCategory === category.value
                  ? "bg-gray text-gray-foreground border-gray/20"
                  : "bg-gray text-gray-foreground border-gray/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="relative group aspect-square bg-gray rounded-lg overflow-hidden"
            >
              <Image
                src={image.url || "/api/placeholder/300/300"}
                alt={image.title || "Restaurant image"}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    text=""
                    onClick={() => setSelectedImage(image)}
                    className="p-1 bg-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      text=""
                      onClick={() => removeImage(image._id || "")}
                      className="p-1 bg-white text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs truncate">
                  {image.title || "Untitled"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Image */}
      {isEditing && (
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-3">Add New Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="space-y-2">
              <Input
                label="Image Title"
                name="title"
                type="text"
                placeholder="Image Title"
                value={newImage.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                fullWidth
                inputSize="sm"
                outlineType="round"
                theme="light"
              />
              <Select
                label="Category"
                name="category"
                placeholder="Select Category"
                value={newImage.associatedWith?.type || ""}
                onChange={(e) => handleAssociatedWithChange("type", e.target.value)}
                options={GALLERY_CATEGORIES}
                fullWidth
                inputSize="sm"
                outlineType="round"
                theme="light"
              />
            </div>
            <div className="space-y-2">
              <Input
                label="Image URL"
                name="url"
                type="url"
                placeholder="Image URL or upload file"
                value={newImage.url || ""}
                onChange={(e) => handleInputChange("url", e.target.value)}
                fullWidth
                inputSize="sm"
                outlineType="round"
                theme="light"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center space-x-2 px-3 py-2 border border-gray/20 rounded-md text-sm cursor-pointer hover:bg-gray/80"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload File</span>
                </label>
              </div>
            </div>
          </div>
          <Textarea
            label="Description"
            name="description"
            placeholder="Image Description (optional)"
            value={newImage.description || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
            fullWidth
            inputSize="sm"
            outlineType="round"
            theme="light"
            rows={2}
          />
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              text="Add Image"
              onClick={addImage}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {!isEditing && filteredImages.length === 0 && (
        <div className="text-center py-8 text-gray-foreground">
          <p>No images added yet.</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">
                {selectedImage.title || "Image Details"}
              </h3>
              <Button
                variant="outline"
                size="sm"
                text=""
                onClick={() => setSelectedImage(null)}
                className="p-1"
              >
                ×
              </Button>
            </div>
            <Image
              src={selectedImage.url}
              alt={selectedImage.title || "Selected image"}
              className="w-full h-auto rounded-lg mb-4"
            />
            {selectedImage.description && (
              <p className="text-sm text-gray-foreground mb-2">
                {selectedImage.description}
              </p>
            )}
            <div className="text-xs text-gray-foreground">
              <p>Category: {selectedImage.associatedWith?.type || "Unknown"}</p>
              <p>Type: {selectedImage.type}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 
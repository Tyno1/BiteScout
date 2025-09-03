import { IconButton, Input } from "@/components/atoms";
import { Edit, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import type { Restaurant } from "shared/types/api/schemas";

type RestaurantProfileHeroProps = {
  image1: string | null;
  isEditing: boolean;
  displayData: Restaurant | undefined;
  handleInputChange: (
    field: keyof Restaurant,
    value: Restaurant[keyof Restaurant]
  ) => void;
  handleSave: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
  handleImageUpload: () => void;
};

export function RestaurantProfileHero({
  image1,
  isEditing,
  displayData,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleImageUpload,
}: RestaurantProfileHeroProps) {
  return (
    <section
      className="relative h-[30vh] w-full bg-black text-white flex flex-col items-start justify-center px-2 md:px-14"
      aria-label="Restaurant header"
    >
      {image1 && (
        <Image
          src={image1}
          style={{ objectFit: "cover" }}
          alt="hero image"
          fill
          className="absolute inset-0"
        />
      )}

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="z-10 w-full flex flex-col  gap-4 items-center justify-between">
        <div className="flex-5 flex min-w-0">
          {isEditing ? (
            <div className="flex-1 min-w-0">
              <Input
                fullWidth
                outlineType={isEditing ? "round" : "none"}
                type="text"
                name="restaurant-name"
                label="Restaurant Name"
                disabled={!isEditing}
                value={displayData?.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Add Restaurant Name here"
                className="text-4xl md:text-6xl font-bold bg-transparent w-full"
              />
            </div>
          ) : (
            <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
              {displayData?.name}
            </h1>
          )}
        </div>
        <div
          className="flex gap-2 flex-2"
          role="toolbar"
          aria-label="Profile actions"
        >
          {isEditing ? (
            <div className="flex gap-2 ml-auto flex-wrap">
              <IconButton
                icon={<Save className="w-4 h-4" />}
                variant="outline"
                color="neutral"
                size="sm"
                onClick={handleSave}
                ariaLabel="Save changes"
              />
              <IconButton
                icon={<X className="w-4 h-4" />}
                variant="outline"
                color="neutral"
                size="sm"
                onClick={handleCancel}
                ariaLabel="Cancel editing"
              />
              <IconButton
                icon={<Upload className="w-4 h-4" />}
                variant="outline"
                color="neutral"
                size="sm"
                onClick={handleImageUpload}
                ariaLabel="Upload new cover image"
              />
            </div>
          ) : (
            <IconButton
              icon={<Edit className="w-4 h-4" />}
              variant="outline"
              color="neutral"
              size="sm"
              onClick={handleEdit}
              ariaLabel="Edit profile"
              className="ml-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
}

import { IconButton, Input } from "@/components/atoms";
import { Plus, X } from "lucide-react";

export function RestaurantProfileFeatures({
  isEditing,
  newFeature,
  setNewFeature,
  handleKeyPress,
  addFeature,
  removeFeature,
  displayData,
}: any) {
  return (
    <section
      className="bg-white rounded-lg border border-1 border-gray-100 p-6 "
      aria-labelledby="features-heading"
    >
      <div className="mb-4">
        <h2 id="features-heading" className="text-lg font-semibold">
          Restaurant Features
        </h2>
      </div>
      {isEditing && (
        <div
          className="flex gap-2 mb-4 items-center"
          role="form"
          aria-label="Add new feature"
        >
          <Input
            fullWidth
            outlineType={isEditing && "round"}
            type="text"
            onKeyDown={handleKeyPress}
            name="New feature name"
            label="New feature name"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature (e.g., Outdoor Seating, WiFi)"
          />

          <IconButton
            variant="solid"
            icon={<Plus />}
            onClick={addFeature}
            aria-label="Add Feature"
          />
        </div>
      )}
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Restaurant features"
      >
        {displayData.features?.map((feature: any) => (
          <div
            key={feature}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            role="listitem"
          >
            <span>{feature}</span>
            {isEditing && (
              <IconButton
                variant="plain"
                size="xs"
                icon={<X size={15} />}
                onClick={() => removeFeature(feature)}
                aria-label={`Remove ${feature}`}
              />
            )}
          </div>
        ))}
        {displayData.features?.length === 0 && (
          <p className="text-gray-500 italic" role="status">
            No features added yet
          </p>
        )}
      </div>
    </section>
  );
}

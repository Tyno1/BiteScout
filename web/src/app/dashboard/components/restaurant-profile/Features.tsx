import { Plus, X } from "lucide-react";
 
export default function Features({
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
      className="bg-white rounded-lg shadow-sm border p-6"
      aria-labelledby="features-heading"
    >
      <div className="mb-4">
        <h2 id="features-heading" className="text-lg font-semibold">
          Restaurant Features
        </h2>
      </div>
      {isEditing && (
        <div
          className="flex gap-2 mb-4"
          role="form"
          aria-label="Add new feature"
        >
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a feature (e.g., Outdoor Seating, WiFi)"
            className="flex-1 rounded-md border px-3 py-2"
            aria-label="New feature name"
          />
          <button
            onClick={addFeature}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            aria-label="Add feature"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
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
              <button
                onClick={() => removeFeature(feature)}
                className="hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                aria-label={`Remove ${feature}`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
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

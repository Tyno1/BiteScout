import { IconButton, Select } from "@/components/atoms";
import { Card } from "@/components/organisms";
import type { Restaurant, RestaurantFeature } from "@shared/types/api/schemas";
import { ChevronDown, ChevronRight, Plus, Sparkles, Info, CheckCircle, Tag } from "lucide-react";
import { useState } from "react";
import {
  ALL_FEATURES,
  FEATURE_CATEGORIES,
  type CategorizedFeature,
  categorizeFeatures,
} from "../../../../utils";

type RestaurantProfileFeaturesProps = {
  isEditing: boolean;
  newFeature: RestaurantFeature | null;
  setNewFeature: (value: RestaurantFeature) => void;
  addFeature: (feature: RestaurantFeature) => void;
  displayData: { 
    features?: RestaurantFeature[];
  };
  handleInputChange?: (
    field: keyof Restaurant,
    value: Restaurant[keyof Restaurant]
  ) => void;
};

export function RestaurantProfileFeatures({
  isEditing,
  newFeature,
  setNewFeature,
  addFeature,
  displayData,
  handleInputChange,
}: RestaurantProfileFeaturesProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<"categorized" | "list">(
    "categorized"
  );

  // Get features from flat array
  const getFeatures = (): RestaurantFeature[] => {
    return displayData.features || [];
  };

  const getCategorizedFeatures = (): CategorizedFeature[] => {
    return categorizeFeatures(displayData.features || []);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleFeature = (feature: RestaurantFeature) => {
    if (!handleInputChange) return;

    const currentFeatures = getFeatures();
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature];

    // Update features array
    handleInputChange("features", newFeatures);
  };

  const isFeatureSelected = (feature: RestaurantFeature) => {
    return getFeatures().includes(feature);
  };

  const getSelectedCount = () => {
    return getFeatures().length;
  };

  const categorizedFeatures = getCategorizedFeatures();

  return (
    <Card
      Component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
                              <Tag className="w-5 h-5 text-gray-foreground" />
              <div>
                <h2 id="features-heading" className="text-lg font-semibold">
                  Restaurant Features
                </h2>
                <p className="text-sm text-gray-foreground">
                  {getSelectedCount()} features selected
                </p>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2">
                                  <button
                    type="button"
                    onClick={() => setViewMode("categorized")}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      viewMode === "categorized"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-gray text-gray-foreground hover:bg-gray/80"
                    }`}
                  >
                    Categorized
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-gray text-gray-foreground hover:bg-gray/80"
                    }`}
                  >
                    List
                  </button>
              </div>
            )}
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-gray-foreground bg-gray px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Pro tip:</strong> Select features that best describe your restaurant to help customers find you and understand what to expect!
              </span>
            </div>
          )}
        </div>
      }
      aria-labelledby="features-heading"
    >
      {isEditing && viewMode === "categorized" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-foreground bg-gray px-3 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span>Click on categories to expand and select features. This helps organize your restaurant&apos;s amenities.</span>
          </div>
          {Object.entries(FEATURE_CATEGORIES).map(([category, availableFeatures]: [string, RestaurantFeature[]]) => {
            const selectedFeatures = categorizedFeatures.find(cat => cat.category === category)?.features || [];
            
            return (
              <div key={category} className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="w-full px-4 py-3 flex justify-between items-center bg-gray hover:bg-gray/80 rounded-t-lg transition-colors"
                >
                  <div className="flex items-center gap-6 ">
                    <span className="font-medium text-sm  text-foreground">
                      {category}
                    </span>
                    {selectedFeatures.length > 0 && (
                      <span className="bg-primary/10 border-1 border-primary text-primary px-3 py-1 rounded-full text-xs font-sm">
                        {selectedFeatures.length} selected
                      </span>
                    )}
                  </div>
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="w-4 h-4 text-gray-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-foreground" />
                  )}
                </button>

                {expandedCategories.has(category) && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableFeatures.map((feature: RestaurantFeature) => (
                      <label
                        key={feature}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isFeatureSelected(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className={`text-sm ${isFeatureSelected(feature) ? 'text-primary font-medium' : 'text-foreground'}`}>
                          {feature}
                        </span>
                        {isFeatureSelected(feature) && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isEditing && viewMode === "list" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-foreground bg-gray px-3 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span>Use the dropdown to add specific features or check the boxes below to select multiple features at once.</span>
          </div>
          <div className="flex gap-2 items-center">
            <Select
              fullWidth
              outlineType="round"
              label=""
              name="new-feature"
              options={ALL_FEATURES.map((feature) => ({
                value: feature,
                label: feature,
              }))}
              value={newFeature || ""}
              onChange={(e) =>
                setNewFeature((e.target.value as RestaurantFeature) || null)
              }
              placeholder="Select a feature to add"
            />
            <IconButton
              variant="solid"
              icon={<Plus />}
              onClick={() => newFeature && addFeature(newFeature)}
              aria-label="Add Feature"
              disabled={!newFeature}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_FEATURES.map((feature) => (
              <label
                key={feature}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={isFeatureSelected(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className={`text-sm ${isFeatureSelected(feature) ? 'text-primary font-medium' : 'text-foreground'}`}>
                  {feature}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="space-y-4">
          {categorizedFeatures.length > 0 ? (
            categorizedFeatures.map((category) => (
              <div key={category.category} className="space-y-1 mb-6">
                <h3 className="font-medium text-foreground">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature) => (
                    <div
                      key={feature}
                      className="bg-gray text-gray-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-foreground italic">No features added yet</p>
          )}
        </div>
      )}
    </Card>
  );
}

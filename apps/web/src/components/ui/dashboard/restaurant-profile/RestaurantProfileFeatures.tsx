import { Alert, Button, IconButton, Select } from "@/components/atoms";
import { Card } from "@/components/organisms";
import {
  ALL_FEATURES,
  type CategorizedFeature,
  FEATURE_CATEGORIES,
  categorizeFeatures,
} from "@/utils";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Tag,
} from "lucide-react";
import { useState } from "react";
import type { Restaurant, RestaurantFeature } from "shared/types/api/schemas";

type RestaurantProfileFeaturesProps = {
  isEditing: boolean;
  newFeature: RestaurantFeature | null;
  setNewFeature: (value: RestaurantFeature) => void;
  addFeature: (feature: RestaurantFeature) => void;
  displayData: Restaurant | undefined;
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
    return displayData?.features || [];
  };

  const getCategorizedFeatures = (): CategorizedFeature[] => {
    return categorizeFeatures(displayData?.features || []);
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
      component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-secondary" />
              <div>
                <h2 id="features-heading" className="text-lg font-semibold">
                  Restaurant Features
                </h2>
                <p className="text-sm text-secondary">
                  {getSelectedCount()} features selected
                </p>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  color={viewMode === "categorized" ? "secondary" : "neutral"}
                  size="xs"
                  text="Categorized"
                  onClick={() => setViewMode("categorized")}
                >
                  Categorized
                </Button>

                <Button
                  variant="outline"
                  color={viewMode === "list" ? "secondary" : "neutral"}
                  size="xs"
                  text="List"
                  onClick={() => setViewMode("list")}
                />
              </div>
            )}
          </div>
          {isEditing && (
            <Alert status="information">
              Pro tip: Select features that best describe your restaurant to
              help customers find you and understand what to expect!
            </Alert>
          )}
        </div>
      }
      aria-labelledby="features-heading"
    >
      {isEditing && viewMode === "categorized" && (
        <div className="space-y-4">
          <Alert status="information">
            Click on categories to expand and select features. This helps
            organize your restaurant&apos;s amenities.
          </Alert>

          {Object.entries(FEATURE_CATEGORIES).map(
            ([category, availableFeatures]: [string, RestaurantFeature[]]) => {
              const selectedFeatures =
                categorizedFeatures.find((cat) => cat.category === category)
                  ?.features || [];

              return (
                <div
                  key={category}
                  className="border border-gray-200 rounded-lg"
                >
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
                          <span
                            className={`text-sm ${isFeatureSelected(feature) ? "text-primary font-medium" : "text-foreground"}`}
                          >
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
            }
          )}
        </div>
      )}

      {isEditing && viewMode === "list" && (
        <div className="space-y-4">
          <Alert status="information">
            Use the dropdown to add specific features or check the boxes below
            to select multiple features at once.
          </Alert>

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
              color="primary"
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
                <span
                  className={`text-sm ${isFeatureSelected(feature) ? "text-secondary font-medium" : "text-foreground"}`}
                >
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
              <div key={category.category} className="space-y-2 mb-6">
                <h3 className="font-medium text-foreground">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature) => (
                    <div
                      key={feature}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-sm text-sm"
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

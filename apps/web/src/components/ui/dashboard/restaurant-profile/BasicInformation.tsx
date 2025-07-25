import { Button, IconButton, Select, Textarea } from "@/components/atoms";
import { Card } from "@/components/organisms";
import type { Cuisine, Restaurant } from "shared/types/api/schemas";
import { X, Info, ChefHat, DollarSign } from "lucide-react";
import { useState } from "react";

type BasicInformation = {
  isEditing: boolean;
  cuisines: Cuisine[];
  addCuisine: (cuisine: Cuisine) => void;
  editableData: Restaurant | null;
  setEditableData: (value: Restaurant) => void;
  displayData: Restaurant | null;
  handleInputChange: (
    field: keyof Restaurant,
    value: Restaurant[keyof Restaurant]
  ) => void;
  removeCuisine: (cuisine: Cuisine) => void;
};

export function BasicInformation({
  removeCuisine,
  isEditing,
  addCuisine,
  cuisines,
  displayData,
  handleInputChange,
}: BasicInformation) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");

  
  const handleAddCuisine = () => {
    if (!selectedCuisine) return;

    const cuisineToAdd = cuisines.find((c) => c._id === selectedCuisine);
    if (cuisineToAdd) {
      addCuisine(cuisineToAdd);
      setSelectedCuisine("");
    }
  };

  return (
    <Card
      Component="section"
      padding="lg"
      header={
        <div className="flex items-center gap-3">
          <h2 id="basic-info-heading" className="text-lg font-semibold">
            Basic Information
          </h2>
          {isEditing && (
            <div className="text-xs text-gray-foreground bg-gray px-2 py-1 rounded">
              Complete profile to attract customers
            </div>
          )}
        </div>
      }
      aria-labelledby="basic-info-heading"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-gray-foreground" />
              <label
                htmlFor="cuisine-type"
                id="cuisine-type"
                className="font-medium text-black"
              >
                Cuisine Type
              </label>
            </div>
            {isEditing && (
              <p className="text-sm text-gray-foreground">
                Select cuisine types to help customers find you
              </p>
            )}
            <div className="flex gap-4 mt-2">
              {isEditing && (
                <div className="w-full space-y-3">
                  <div className="text-xs text-gray-foreground bg-gray px-2 py-1 rounded">
                    Select cuisine → Add → Repeat
                  </div>
                                    <div className="flex items-center gap-2 w-full">
                    <Select
                      fullWidth
                      outlineType="round"
                      name="cuisine-type"
                      label=""
                      options={cuisines.map((cuisine) => ({
                        value: cuisine._id ?? "",
                        label: cuisine.name,
                      }))}
                      value={selectedCuisine}
                      onChange={(e) => setSelectedCuisine(e.target.value)}
                      placeholder={
                        cuisines.length === 0
                          ? "Loading cuisines..."
                          : "Choose a cuisine type to add"
                      }
                    />
                    <Button
                      text={selectedCuisine ? "Add Cuisine" : "Select & Add"}
                      variant="solid"
                      onClick={handleAddCuisine}
                      disabled={!selectedCuisine || cuisines.length === 0}
                      className="whitespace-nowrap"
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              {isEditing && displayData?.cuisine && displayData.cuisine.length > 0 && (
                <div className="text-xs text-gray-foreground bg-gray px-2 py-1 rounded mb-2">
                  ✓ {displayData.cuisine.length} cuisine{displayData.cuisine.length > 1 ? 's' : ''} added
                </div>
              )}
              <div className="mt-2">
                {displayData?.cuisine && displayData.cuisine.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {displayData.cuisine.map((cuisine) => (
                      <div
                        key={cuisine?._id}
                        className="bg-gray text-gray-foreground px-2.5 py-1 rounded-md flex items-center gap-1.5 text-sm border border-gray/20 hover:bg-gray/80 transition-colors"
                      >
                        <span className="font-medium truncate max-w-20" title={cuisine.name}>
                          {cuisine.name}
                        </span>
                        {isEditing && (
                          <IconButton
                            variant="plain"
                            size="xs"
                            icon={<X size={12} />}
                            onClick={() => removeCuisine(cuisine)}
                            aria-label={`Remove ${cuisine.name}`}
                            className="text-gray-foreground hover:text-gray-foreground/80 flex-shrink-0"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-foreground text-sm bg-gray p-3 rounded-lg italic border border-dashed border-gray/20">
                    <div className="flex items-center gap-2">
                      <span>No cuisines added</span>
                      {isEditing && (
                        <span className="text-gray-foreground">← Select above</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-foreground" />
              <label className="font-medium text-black">Price Range</label>
            </div>
            {isEditing && (
              <p className="text-sm text-gray-foreground">
                Set price range for customer expectations
              </p>
            )}
            <Select
              disabled={!isEditing}
              label=""
              name="price-range"
              useLabel={false}
              outlineType={isEditing ? "round" : "none"}
              inputSize="sm"
              placeholder="Select price tier"
              options={[
                { value: "$", label: "$ (Budget-friendly)" },
                { value: "$$", label: "$$ (Moderate pricing)" },
                { value: "$$$", label: "$$$ (Premium dining)" },
                { value: "$$$$", label: "$$$$ (Luxury experience)" },
              ]}
              value={displayData?.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-foreground" />
            <label className="font-medium text-black">Full Description</label>
          </div>
          {isEditing && (
            <p className="text-sm text-gray-foreground">
              Tell customers about your restaurant
            </p>
          )}
          <Textarea
            fullWidth
            outlineType={isEditing ? "round" : "none"}
            name="description-label"
            label=""
            useLabel={false}
            rows={4}
            disabled={!isEditing}
            value={displayData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Share your restaurant's unique story, signature dishes, and what makes your dining experience special..."
          />
        </div>
      </div>
    </Card>
  );
}

import { Button, IconButton, Select, Textarea } from "@/components/atoms";
import type { Cuisine } from "@/types";
import type { Restaurant } from "@shared/types/api/schemas";
import { X } from "lucide-react";
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

  console.log(displayData?.cuisine);

  const handleAddCuisine = () => {
    if (!selectedCuisine) return;

    const cuisineToAdd = cuisines.find((c) => c._id === selectedCuisine);
    if (cuisineToAdd) {
      addCuisine(cuisineToAdd);
      setSelectedCuisine("");
    }
  };

  return (
    <section
      className="bg-white rounded-lg border-1 border-gray-100 p-6"
      aria-labelledby="basic-info-heading"
    >
      <div className="mb-4">
        <h2 id="basic-info-heading" className="text-lg font-semibold">
          Basic Information
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <label
              htmlFor="cuisine-type"
              id="cuisine-type"
              className="font-medium text-black"
            >
              Cuisine Type
            </label>
            <div className="flex gap-4 mt-2">
              {isEditing && (
                <div className="flex items-center gap-2 w-full">
                  <Select
                    fullWidth
                    outlineType="round"
                    name="cuisine-type"
                    label=""
                    options={cuisines
                      .filter(
                        (
                          cuisine
                        ): cuisine is Cuisine & { _id: string; name: string } =>
                          Boolean(cuisine._id && cuisine.name)
                      )
                      .map((cuisine) => ({
                        value: cuisine._id,
                        label: cuisine.name,
                      }))}
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    placeholder={
                      cuisines.length === 0
                        ? "Loading cuisines..."
                        : "Select cuisine type"
                    }
                  />
                  <Button
                    text="Add"
                    variant="solid"
                    onClick={handleAddCuisine}
                    disabled={!selectedCuisine || cuisines.length === 0}
                  />
                </div>
              )}
            </div>
            <div>
              <ul className="flex flex-wrap gap-2 mt-2">
                {displayData?.cuisine?.map((cuisine) => (
                  <li
                    key={cuisine?._id}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{cuisine.name}</span>
                    {isEditing && (
                      <IconButton
                        variant="plain"
                        size="xs"
                        icon={<X size={15} />}
                        onClick={() => removeCuisine(cuisine)}
                        aria-label={`Remove ${cuisine.name}`}
                      />
                    )}
                  </li>
                ))}
                {displayData?.cuisine?.length === 0 && (
                  <li className="text-gray-500 text-sm  mt-2 bg-gray-100 p-4 rounded-xl italic">
                    No Cuisine added yet
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <Select
              disabled={!isEditing}
              label="Price Range"
              name="price-range"
              useLabel
              outlineType={isEditing ? "round" : "none"}
              inputSize="sm"
              placeholder="Select price tier"
              options={[
                { value: "$", label: "$ (Budget)" },
                { value: "$$", label: "$$ (Moderate)" },
                { value: "$$$", label: "$$$ (Expensive)" },
                { value: "$$$$", label: "$$$$ (Luxury)" },
              ]}
              value={displayData?.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <Textarea
            fullWidth
            outlineType={isEditing ? "round" : "none"}
            name="description-label"
            label="Full Description"
            useLabel
            rows={4}
            disabled={!isEditing}
            value={displayData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your restaurant"
          />
        </div>
      </div>
    </section>
  );
}

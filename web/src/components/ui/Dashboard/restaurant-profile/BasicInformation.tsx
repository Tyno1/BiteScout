import {
  Button,
  IconButton,
  Input,
  Select,
  Textarea,
} from "@/components/atoms";
import { RestaurantData } from "@/types/restaurantData";
import { X } from "lucide-react";

type BasicInformation = {
  isEditing: boolean;
  newCuisine: string;
  setNewCuisine: (value: string) => void;
  editableData: RestaurantData | null;
  setEditableData: (value: RestaurantData) => void;
  displayData: RestaurantData | null;
  handleInputChange: (field: keyof RestaurantData, value: any) => void;
  removeCuisine: (cuisine: string) => void;
};

export function BasicInformation({
  removeCuisine,
  isEditing,
  newCuisine,
  setNewCuisine,
  editableData,
  setEditableData,
  displayData,
  handleInputChange,
}: BasicInformation) {
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

      {/* finsh setting up cuisine */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <label id="cuisine-type" className="font-medium text-black">
              Cuisine Type
            </label>
            <div className="flex gap-4 mt-2">
              {isEditing && (
                <div className="flex items-center gap-2 w-full">
                  <Input
                    fullWidth
                    outlineType={isEditing && "round"}
                    type="text"
                    name="cuisine-type"
                    label="Cuisine Type"
                    aria-labelledby="cuisine-type"
                    value={newCuisine}
                    onChange={(e) => setNewCuisine(e.target.value)}
                    placeholder="Italian"
                  />
                  <Button
                    text="Add"
                    variant="solid"
                    onClick={() => {
                      if (editableData && newCuisine.trim()) {
                        setEditableData({
                          ...editableData,
                          cuisine: [...editableData.cuisine, newCuisine.trim()],
                        });
                        setNewCuisine("");
                      } else {
                        throw new Error(
                          "Please enter a cuisine before adding."
                        );
                      }
                      setNewCuisine("");
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <ul className="flex flex-wrap gap-2 mt-2">
                {displayData?.cuisine?.map((cuisine: any) => (
                  <div
                    key={cuisine}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                    role="listitem"
                  >
                    <span>{cuisine}</span>
                    {isEditing && (
                      <IconButton
                        variant="plain"
                        size="xs"
                        icon={<X size={15} />}
                        onClick={() => removeCuisine(cuisine)}
                        aria-label={`Remove ${cuisine}`}
                      />
                    )}
                  </div>
                ))}
                {displayData?.cuisine?.length === 0 && (
                  <p
                    className="text-gray-500 text-sm  mt-2 bg-gray-100 p-4 rounded-xl italic"
                    role="status"
                  >
                    No Cuisine added yet
                  </p>
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

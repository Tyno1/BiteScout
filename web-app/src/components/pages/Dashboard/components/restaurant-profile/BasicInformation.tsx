import { RestaurantDataState } from "@/types/restaurantData";
import React from "react";

interface BasicInformation {
  isEditing: boolean;
  newCuisine: string;
  setNewCuisine: (value: string) => void;
  editableData: RestaurantDataState | null;
  setEditableData: (value: RestaurantDataState) => void;
  displayData: RestaurantDataState | null;
  handleInputChange: (field: keyof RestaurantDataState, value: any) => void;
}

export default function BasicInformation({
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
      className="bg-white rounded-lg shadow-sm border p-6"
      aria-labelledby="basic-info-heading"
    >
      <div className="mb-4">
        <h2 id="basic-info-heading" className="text-lg font-semibold">
          Basic Information
        </h2>
      </div>

      {/* finsh setting up cuisine */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label id="cuisine-label" className="text-sm font-medium">
              Cuisine Type
            </label>
            {isEditing ? (
              <>
                <div className="flex gap-4">
                  <input
                    placeholder="Italian"
                    className="rounded-md border px-3 py-2 bg-white disabled:bg-gray-100"
                    value={newCuisine}
                    type="text"
                    onChange={(e) => setNewCuisine(e.target.value)}
                  />
                  <button
                    className="rounded-md px-3 py-2 bg-teal-400"
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
                  >
                    Add
                  </button>
                </div>
                <div>
                  <ul>
                    {displayData?.cuisine?.map((cuisine: any) => (
                      <li key={cuisine}>{cuisine.trim()}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div>
                <ul>
                  {displayData?.cuisine?.map((cuisine: any) => (
                    <li key={cuisine}>{cuisine.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label id="price-label" className="text-sm font-medium">
              Price Range
            </label>
            <select
              value={displayData?.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
              disabled={!isEditing}
              className="w-full rounded-md border px-3 py-2 bg-white disabled:bg-gray-100"
              aria-labelledby="price-label"
            >
              <option value="$">$ (Budget)</option>
              <option value="$$">$$ (Moderate)</option>
              <option value="$$$">$$$ (Expensive)</option>
              <option value="$$$$">$$$$ (Luxury)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label id="description-label" className="text-sm font-medium">
            Full Description
          </label>
          <textarea
            value={displayData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your restaurant"
            disabled={!isEditing}
            rows={4}
            className="w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
            aria-labelledby="description-label"
          />
        </div>
      </div>
    </section>
  );
}

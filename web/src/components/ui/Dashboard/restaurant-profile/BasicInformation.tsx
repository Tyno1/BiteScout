import { Button } from "@/components/atoms";
import { RestaurantData } from "@/types/restaurantData";

type BasicInformation = {
  isEditing: boolean;
  newCuisine: string;
  setNewCuisine: (value: string) => void;
  editableData: RestaurantData | null;
  setEditableData: (value: RestaurantData) => void;
  displayData: RestaurantData | null;
  handleInputChange: (field: keyof RestaurantData, value: any) => void;
};

export function BasicInformation({
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
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          <div className="space-y-2 w-full">
            <label
              id="cuisine-label"
              className="text-sm font-medium text-black"
            >
              Cuisine Type
            </label>
            {isEditing ? (
              <>
                <div className="flex gap-4 ">
                  <input
                    placeholder="Italian"
                    className="rounded-md border border-gray-500 px-3 py-1 bg-white disabled:bg-gray-100 w-full"
                    value={newCuisine}
                    type="text"
                    onChange={(e) => setNewCuisine(e.target.value)}
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
                  {displayData?.cuisine && displayData?.cuisine?.length > 0 ? (
                    displayData?.cuisine?.map((cuisine: any) => (
                      <li key={cuisine}>{cuisine.trim()}</li>
                    ))
                  ) : (
                    <div className="mt-2 text-sm text-gray-900">
                      No Cuisines to display
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2 flex flex-col">
            <label id="price-label" className="text-sm font-medium text-black">
              Price Range
            </label>
            <select
              value={displayData?.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
              disabled={!isEditing}
              className="w-full rounded-md border-1 border-gray-500 px-3 py-2 bg-white disabled:bg-gray-100/40"
              aria-labelledby="price-label"
            >
              <option value="$">$ (Budget)</option>
              <option value="$$">$$ (Moderate)</option>
              <option value="$$$">$$$ (Expensive)</option>
              <option value="$$$$">$$$$ (Luxury)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label
            id="description-label"
            className="text-sm font-medium text-black"
          >
            Full Description
          </label>
          <textarea
            value={displayData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your restaurant"
            disabled={!isEditing}
            rows={4}
            className="w-full rounded-md border border-1 border-gray-500 px-3 py-2 disabled:bg-gray-100/40"
            aria-labelledby="description-label"
          />
        </div>
      </div>
    </section>
  );
}

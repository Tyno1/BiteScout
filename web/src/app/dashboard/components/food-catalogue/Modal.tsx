import React from "react";

export default function Modal({
  setIsModalOpen,
  setNewFood,
  newFood,
  CUISINE,
  COURSES,
  ALLERGENS,
  handleAddFood,
  handleImageUpload,
  toggleAllergen,
}: any) {
  console.log(ALLERGENS);
  
  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Food Item</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Food Name</label>
                  <input
                    type="text"
                    placeholder="Enter food name"
                    value={newFood.name}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Ingredients</label>
                  <input
                    type="text"
                    placeholder="List ingredients"
                    value={newFood.ingredients}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        ingredients: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Cuisine Type</label>
                  <select
                    value={newFood.cuisineType}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        cuisineType: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Cuisine Type</option>
                    {CUISINE.map((type: any) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Meal Component</label>
                  <select
                    value={newFood.mealComponent}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        mealComponent: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Meal Component</option>
                    {COURSES.map((component: any) => (
                      <option key={component} value={component}>
                        {component}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Price</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={newFood.price}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2">Allergens</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map((allergen: string) => (
                    <button
                      key={allergen}
                      onClick={() => toggleAllergen(allergen)}
                      className={`px-3 py-1 rounded ${
                        newFood.allergens.includes(allergen)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {allergen}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-6 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFood}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Add Food Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

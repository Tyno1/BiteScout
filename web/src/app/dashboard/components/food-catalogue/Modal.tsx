import { Allergen, Course, Cuisine } from "@/types/foodCatalogue";
import React from "react";

export default function Modal({
  setIsModalOpen,
  setNewFood,
  newFood,
  cuisineData,
  courseData,
  allergenData,
  handleAddFood,
  handleImageUpload,
  toggleAllergen,
  currencies,
  handleAddIngredients,
  handleRemoveIngredients,
  setIngredient,
  ingredient,
}: any) {
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
                  <div className="w-full border rounded flex items-center">
                    <input
                      id="ingredient"
                      type="text"
                      placeholder="List ingredients"
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                      className="p-2 flex-4 w-[80%]"
                    />
                    <button
                      onClick={(e) => handleAddIngredients(ingredient)}
                      className="bg-black text-white h-full w-[20%] p-2 rounded"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {newFood.ingredients.map(
                      (ingredient: string, index: number) => (
                        <div
                          key={index}
                          className="flex gap-2 text-sm bg-black text-white rounded px-2 py-1"
                        >
                          <span>{ingredient}</span>
                          <button
                            onClick={() => handleRemoveIngredients(ingredient)}
                            className=" hover:text-gray-700"
                          >
                            X
                          </button>
                        </div>
                      )
                    )}
                  </div>
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
                    {cuisineData.map((cuisine: Cuisine) => (
                      <option key={cuisine?._id} value={cuisine?._id}>
                        {cuisine?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Course</label>
                  <select
                    value={newFood.course}
                    onChange={(e) =>
                      setNewFood((prev: any) => ({
                        ...prev,
                        course: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Meal Course</option>
                    {courseData.map((course: Course) => (
                      <option key={course?._id} value={course?._id}>
                        {course?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Price</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={newFood.price.value}
                      onChange={(e) =>
                        setNewFood((prev: any) => ({
                          ...prev,
                          price: {
                            ...prev.price,
                            value: parseFloat(e.target.value),
                          },
                        }))
                      }
                      className="w-2/3 border p-2 rounded"
                      step="0.01"
                      min="0"
                    />
                    <select
                      value={newFood.price.currency}
                      onChange={(e) =>
                        setNewFood((prev: any) => ({
                          ...prev,
                          price: {
                            ...prev.price,
                            currency: e.target.value,
                          },
                        }))
                      }
                      className="w-1/3 border p-2 rounded"
                    >
                      {currencies.map((currency: string) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
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
                  {allergenData.map((allergen: Allergen) => (
                    <button
                      key={allergen._id}
                      onClick={() => toggleAllergen(allergen._id)}
                      className={`px-3 py-1 rounded ${
                        newFood.allergens.includes(allergen._id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {allergen.name}
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
                className="px-4 py-2 bg-black hover:bg-green-600 text-white rounded"
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

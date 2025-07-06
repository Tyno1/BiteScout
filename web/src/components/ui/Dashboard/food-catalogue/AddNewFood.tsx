import { Allergen, Course, Cuisine, FoodData } from "@/types/foodCatalogue";
import React, { ReactNode } from "react";
import { formErrorType } from "@/app/dashboard/food-catalogue/page";
import { Button, IconButton, Input, Select } from "@/components/atoms";
import { X } from "lucide-react";

type FoodCatalogueModalType = {
  setNewFood: React.Dispatch<React.SetStateAction<FoodData>>;
  newFood: FoodData;
  cuisineData: Cuisine[];
  courseData: Course[];
  allergenData: Allergen[];
  handleImageUpload: (e: any) => void;
  toggleAllergen: (allergen: string) => void;
  currencies: string[];
  handleAddIngredients: (ingredient: string) => void;
  handleRemoveIngredients: (ingredient: string) => void;
  setIngredient: (ingredient: string) => void;
  ingredient: string;
  formError: formErrorType;
  FormWarning: (message: string) => ReactNode;
};
export function AddNewFood({
  setNewFood,
  newFood,
  cuisineData,
  courseData,
  allergenData,
  handleImageUpload,
  toggleAllergen,
  currencies,
  handleAddIngredients,
  handleRemoveIngredients,
  setIngredient,
  ingredient,
  formError,
  FormWarning,
}: FoodCatalogueModalType) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Food Name"
          outlineType="round"
          name="food-name"
          useLabel
          type="text"
          placeholder="Enter food name"
          value={newFood.name}
          onChange={(e) =>
            setNewFood((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          errorMessage={formError.name && FormWarning("Name is required")}
        />

        <div className="w-[100%] overflow-hidden">
          <label className="block mb-2">Ingredients</label>
          {formError.ingredients && FormWarning("Ingredients is required")}

          <div
            className={`w-full border rounded flex items-center  ${
              formError.ingredients
                ? "border-red focus:ring-red-500 focus:border-red"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          >
            <input
              onKeyDown={(e) =>
                e.key === "Enter" ? handleAddIngredients(ingredient) : null
              }
              id="ingredient"
              type="text"
              placeholder="List ingredients"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="p-2 flex-4 w-[80%]"
            />
            <button
              onClick={() => handleAddIngredients(ingredient)}
              className="bg-black text-white h-full w-[20%] p-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {newFood.ingredients.map((ingredient: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm bg-black rounded-xl px-2 py-1"
              >
                <span className="text-white ">{ingredient}</span>

                <IconButton
                  icon={<X size={16} />}
                  size="xs"
                  variant="plain"
                  color="primary"
                  onClick={() => handleRemoveIngredients(ingredient)}
                />
              </div>
            ))}
          </div>
        </div>

        <Select
          label="Cuisine Type"
          name="cuisine-type"
          useLabel
          outlineType="round"
          options={
            cuisineData?.map((cuisine: Cuisine) => ({
              value: cuisine?._id ?? "",
              label: cuisine?.name,
            })) || []
          }
          value={newFood?.cuisineType}
          onChange={(e) =>
            setNewFood((prev: any) => ({
              ...prev,
              cuisineType: e.target.value,
            }))
          }
          errorMessage={
            formError.cuisineType && FormWarning("Cuisine Type is required")
          }
        />

        <Select
          label="Course"
          name="course"
          useLabel
          outlineType="round"
          options={
            courseData?.map((course: Course) => ({
              value: course?._id ?? "",
              label: course?.name,
            })) || []
          }
          value={newFood?.course}
          onChange={(e) =>
            setNewFood((prev: any) => ({
              ...prev,
              course: e.target.value,
            }))
          }
          errorMessage={formError.course && FormWarning("Course is required")}
        />

        <div className="flex gap-2 items-end">
          <Input
            fullWidth
            label="Price"
            outlineType="round"
            name="price"
            useLabel
            type="number"
            step="0.01"
            min="0"
            onWheel={(e) => e.currentTarget.blur()}
            inputMode="decimal"
            placeholder="0.00"
            value={newFood.price.amount}
            onChange={(e) =>
              setNewFood((prev: any) => ({
                ...prev,
                price: {
                  ...prev.price,
                  amount: parseFloat(e.target.value),
                },
              }))
            }
            errorMessage={formError.name && FormWarning("Name is required")}
          />

          <Select
            className="w-[100px]"
            label="Currencies"
            name="currencies"
            outlineType="round"
            options={
              currencies?.map((currency: string) => ({
                value: currency ?? "",
                label: currency,
              })) || []
            }
            value={newFood?.course}
            onChange={(e) =>
              setNewFood((prev: any) => ({
                ...prev,
                price: {
                  ...prev.price,
                  currency: e.target.value,
                },
              }))
            }
            errorMessage={formError.course && FormWarning("Course is required")}
          />
        </div>

        <Input
          label="Image"
          name="image"
          useLabel
          outlineType="round"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className="mt-4">
        <label className="block mb-3">Allergens</label>
        {formError.allergens && FormWarning("Allergens is required")}

        <div className="flex flex-wrap gap-2">
          {allergenData.map((allergen: Allergen) => (
            <Button
              size="sm"
              color="black"
              variant={
                allergen._id && newFood.allergens.includes(allergen._id)
                  ? "solid"
                  : "outline"
              }
              text={allergen.name}
              key={allergen._id}
              onClick={() => allergen._id && toggleAllergen(allergen._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

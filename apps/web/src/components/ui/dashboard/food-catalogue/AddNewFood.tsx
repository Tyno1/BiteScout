import { Button, IconButton, Input, Select } from "@/components/atoms";
import type { FormErrorType } from "@/hooks/food-catalogue/useFoodCatalogueForm";
import { X } from "lucide-react";
import type React from "react";
import type { ReactNode } from "react";
import type { Allergen, Course, Cuisine, FoodCatalogue } from "shared/types/api/schemas";
import type { Currency } from "shared/types/common";

type FoodCatalogueModalType = {
  setNewFood: React.Dispatch<React.SetStateAction<FoodCatalogue>>;
  newFood: FoodCatalogue;
  cuisineData: Cuisine[];
  courseData: Course[];
  allergenData: Allergen[];
  toggleAllergen: (allergen: Allergen) => void;
  currencies: string[];
  handleAddIngredients: (ingredient: string) => void;
  handleRemoveIngredients: (ingredient: string) => void;
  setIngredient: (ingredient: string) => void;
  ingredient: string;
  formError: FormErrorType;
  FormWarning: (message: string) => ReactNode;
};
export function AddNewFood({
  setNewFood,
  newFood,
  cuisineData,
  courseData,
  allergenData,
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
    <div>
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

        <div className="w-[100%] overflow-hidden px-2">
          <Input
            label="Ingredients"
            useLabel
            outlineType="round"
            name="ingredients"
            onKeyDown={(e) => (e.key === "Enter" ? handleAddIngredients(ingredient) : null)}
            id="ingredient"
            type="text"
            placeholder="List ingredients"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            rightButton={
              <Button
                text="Add"
                onClick={() => handleAddIngredients(ingredient)}
                variant="solid"
                color="primary"
                size="sm"
              />
            }
            errorMessage={formError.ingredients && FormWarning(formError.ingredients)}
          />

          <div className="flex gap-2 mt-2 overflow-x-auto">
            {newFood.ingredients?.map((ingredient: string) => (
              <div
                key={ingredient}
                className="flex items-center gap-2 text-sm bg-black rounded-xl px-2 py-1"
              >
                <span className="text-white ">{ingredient}</span>

                <IconButton
                  aria-label="Remove ingredient"
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
          placeholder="Please select"
          label="Cuisine Type"
          name="cuisine-type"
          useLabel
          outlineType="round"
          options={[
            { value: "", label: "Please select" },
            ...(cuisineData?.map((cuisine: Cuisine) => ({
              value: cuisine?._id ?? "",
              label: cuisine?.name ?? "",
            })) || []),
          ]}
          value={newFood?.cuisineType?._id}
          onChange={(e) => {
            const selectedCuisine = e.target.value
              ? cuisineData.find((cuisine) => cuisine._id === e.target.value)
              : { _id: "", name: "", description: "" };

            setNewFood((prev: FoodCatalogue) => ({
              ...prev,
              cuisineType: selectedCuisine as Cuisine,
            }));
          }}
          errorMessage={formError.cuisineType && FormWarning(formError.cuisineType)}
        />

        <Select
          placeholder="Please select"
          label="Course"
          name="course"
          useLabel
          outlineType="round"
          options={[
            { value: "", label: "Please select" },
            ...(courseData?.map((course: Course) => ({
              value: course?._id ?? "",
              label: course?.name ?? "",
            })) || []),
          ]}
          value={newFood?.course?._id}
          onChange={(e) => {
            const selectedCourse = e.target.value
              ? courseData.find((course) => course._id === e.target.value)
              : { _id: "", name: "", description: "" };

            setNewFood((prev: FoodCatalogue) => ({
              ...prev,
              course: selectedCourse as Course,
            }));
          }}
          errorMessage={formError?.course && FormWarning(formError.course)}
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
            value={newFood.price?.amount ?? 0}
            onChange={(e) => {
              const value = e.target.value;
              const amount = value === "" ? 0 : Number.parseFloat(value) || 0;

              setNewFood((prev: FoodCatalogue) => ({
                ...prev,
                price: {
                  ...prev.price,
                  amount: amount,
                },
              }));
            }}
            errorMessage={formError.price && FormWarning(formError.price)}
          />

          <Select
            placeholder="Please select"
            className="w-[100px]"
            label="Currencies"
            name="currencies"
            outlineType="round"
            options={
              currencies?.map((currency: string) => ({
                value: currency,
                label: currency,
              })) || []
            }
            value={newFood?.price?.currency}
            onChange={(e) =>
              setNewFood((prev: FoodCatalogue) => ({
                ...prev,
                price: {
                  ...prev.price,
                  currency: e.target.value as Currency,
                },
              }))
            }
            errorMessage={formError.course && FormWarning(formError.course)}
          />
        </div>

        <div className="flex flex-col gap-4 items-start">
          <Input
            labelRow
            label="Available for ordering"
            useLabel
            name="isAvailable"
            type="checkbox"
            checked={newFood.isAvailable ?? true}
            onChange={(e) => setNewFood((prev) => ({ ...prev, isAvailable: e.target.checked }))}
          />

          <Input
            useLabel
            labelRow
            label="Featured item"
            name="isFeatured"
            type="checkbox"
            checked={newFood.isFeatured ?? false}
            onChange={(e) => setNewFood((prev) => ({ ...prev, isFeatured: e.target.checked }))}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="allergens" className="block mb-3">
          Allergens
        </label>
        {formError.allergens && FormWarning(formError.allergens)}

        <div className="flex flex-wrap gap-2">
          {allergenData.map((allergen: Allergen) => (
            <Button
              size="sm"
              color="neutral"
              variant={newFood.allergens?.some((a) => a._id === allergen._id) ? "solid" : "outline"}
              text={allergen.name}
              key={allergen._id}
              onClick={() => toggleAllergen(allergen)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

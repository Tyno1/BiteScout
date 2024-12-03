"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CUISINE_TYPES = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Japanese",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Greek",
  "Other",
] as const;

const MEAL_COMPONENTS = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Side Dish",
] as const;

const ALLERGENS = [
  "Gluten",
  "Dairy",
  "Nuts",
  "Shellfish",
  "Eggs",
  "Soy",
] as const;

type CuisineType = (typeof CUISINE_TYPES)[number];
type MealComponent = (typeof MEAL_COMPONENTS)[number];
type Allergen = (typeof ALLERGENS)[number];

interface FoodItem {
  name: string;
  ingredients: string;
  cuisineType: CuisineType;
  mealComponent: MealComponent;
  price: string;
  allergens: Allergen[];
  images: string[];
}

export default function FoodCatalogueManagement(): React.ReactElement {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [newFood, setNewFood] = useState<FoodItem>({
    name: "",
    ingredients: "",
    cuisineType: "" as CuisineType,
    mealComponent: "" as MealComponent,
    price: "",
    allergens: [],
    images: [],
  });

  const handleAddFood = (): void => {
    if (newFood.name && newFood.cuisineType && newFood.mealComponent) {
      setFoods([...foods, newFood]);
      setNewFood({
        name: "",
        ingredients: "",
        cuisineType: "" as CuisineType,
        mealComponent: "" as MealComponent,
        price: "",
        allergens: [],
        images: [],
      });
    }
  };

  const handleImageUpload = (): void => {
    // Handle image upload logic here
  };

  const toggleAllergen = (allergen: Allergen): void => {
    setNewFood((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Catalogue Management</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Food Name</label>
          <input
            type="text"
            placeholder="Enter food name"
            value={newFood.name}
            onChange={(e) =>
              setNewFood((prev) => ({ ...prev, name: e.target.value }))
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
              setNewFood((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Cuisine Type</label>
          <select
            value={newFood.cuisineType}
            onChange={(e) =>
              setNewFood((prev) => ({
                ...prev,
                cuisineType: e.target.value as CuisineType,
              }))
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select Cuisine Type</option>
            {CUISINE_TYPES.map((type) => (
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
              setNewFood((prev) => ({
                ...prev,
                mealComponent: e.target.value as MealComponent,
              }))
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select Meal Component</option>
            {MEAL_COMPONENTS.map((component) => (
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
              setNewFood((prev) => ({ ...prev, price: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
      <div className="my-4">
        <label className="block mb-2">Allergens</label>
        <div>
          {ALLERGENS.map((allergen) => (
            <button
              key={allergen}
              onClick={() => toggleAllergen(allergen)}
              className={`m-1 p-2 rounded ${
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

      <div className="my-4">
        <label className="block mb-2">Upload Images</label>
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />
          {newFood.images.map((image: any, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt="uploaded image"
              className="w-16 h-16 m-2"
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleAddFood}
        className="w-full bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Food Item
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Ingredients</th>
            <th className="border p-2">Cuisine</th>
            <th className="border p-2">Component</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Allergens</th>
            <th className="border p-2">Images</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{food.name}</td>
              <td className="border p-2">{food.ingredients}</td>
              <td className="border p-2">{food.cuisineType}</td>
              <td className="border p-2">{food.mealComponent}</td>
              <td className="border p-2">${food.price}</td>
              <td className="border p-2">{food.allergens.join(", ")}</td>
              <td className="border p-2">{food.images}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

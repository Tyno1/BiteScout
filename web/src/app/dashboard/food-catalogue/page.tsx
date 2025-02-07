"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../components/food-catalogue/Table";
import Modal from "../components/food-catalogue/Modal";



const CUISINE = [
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

const COURSES = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Side Dish",
] as const;

const ALLERGENS = [
  "Gluten",
  "Shellfish",
  "Eggs",
  "Fish",
  "Peanuts",
  "Soybeans",
  "Milk",
  "Tree nuts",
  "Celery",
  "Mustard",
  "Sesame seeds",
  "Sulfur dioxide and sulfites",
  "Lupin",
  "Mollusks",
];

export type FoodItem = {
  name: string;
  ingredients: string;
  cuisineType: string[];
  mealComponent: string[];
  price: string;
  allergens: string[];
  images: string[];
};

export default function FoodCatalogueManagement(): React.ReactElement {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFood, setNewFood] = useState<FoodItem>({
    name: "",
    ingredients: "",
    cuisineType: [],
    mealComponent: [],
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
        cuisineType: [],
        mealComponent: [],
        price: "",
        allergens: [],
        images: [],
      });
      setIsModalOpen(false);
    }
  };

  const toggleAllergen = (allergen: string): void => {
    setNewFood((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const handleImageUpload = (): void => {
    // Handle image upload logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Catalogue</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Item
        </button>
      </div>

      {/* Food Catalogue Table */}
      <Table foods={foods} />

      {/* Modal */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setNewFood={setNewFood}
          newFood={newFood}
          CUISINE={CUISINE}
          COURSES={COURSES}
          ALLERGENS={ALLERGENS}
          handleAddFood={handleAddFood}
          handleImageUpload={handleImageUpload}
          toggleAllergen={toggleAllergen}
        />
      )}
    </div>
  );
}

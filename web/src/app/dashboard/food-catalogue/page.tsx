"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../components/food-catalogue/Table";
import Modal from "../components/food-catalogue/Modal";
import { FoodCatalogue } from "@/types/foodCatalogue";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getAllergens } from "@/state/allergen/allergenSlice";
import { getCuisine } from "@/state/cuisine/cuisineSlice";
import { getCourse } from "@/state/course/courseSlice";

export default function FoodCatalogueManagement(): React.ReactElement {
  const {
    allergenData,
    status: allergenStatus,
    error: allergenError,
  } = useSelector((state: RootState) => state.allergen);
  const {
    courseData,
    status: courseStatus,
    error: courseError,
  } = useSelector((state: RootState) => state.course);
  const {
    cuisineData,
    status: cuisineStatus,
    error: cuisineError,
  } = useSelector((state: RootState) => state.cuisine);
  const dispatch = useDispatch<AppDispatch>();

  const [foods, setFoods] = useState<FoodCatalogue[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFood, setNewFood] = useState<FoodCatalogue>({
    name: "",
    ingredients: [],
    cuisineType: "",
    course: "",
    price: "",
    allergens: [],
    images: [],
  });

  const handleAddFood = (): void => {
    if (newFood.name && newFood.cuisineType && newFood.course) {
      setFoods([...foods, newFood]);
      setNewFood({
        name: "",
        ingredients: [],
        cuisineType: "",
        course: "",
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

  useEffect(() => {
    dispatch(getAllergens());
    dispatch(getCuisine());
    dispatch(getCourse());

    console.log(
      "Allergens:",
      allergenData,
      "Cuisine:",
      cuisineData,
      "Courses:",
      courseData
    );

    // Fetch foods data from the server here and update the foods state accordingly.
  }, [dispatch]);

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
          cuisineData={cuisineData}
          courseData={courseData}
          allergenData={allergenData}
          handleAddFood={handleAddFood}
          handleImageUpload={handleImageUpload}
          toggleAllergen={toggleAllergen}
        />
      )}
    </div>
  );
}

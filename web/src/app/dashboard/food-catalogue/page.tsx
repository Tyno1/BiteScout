"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../components/food-catalogue/Table";
import Modal from "../components/food-catalogue/Modal";
import { FoodData } from "@/types/foodCatalogue";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getAllergens } from "@/state/allergen/allergenSlice";
import { getCuisine } from "@/state/cuisine/cuisineSlice";
import { getCourse } from "@/state/course/courseSlice";
import {
  createFoodCatalogue,
  getFoodCatalogue,
} from "@/state/foodCatalogueData/foodCatalogueSlice";

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
  const {
    restaurantData,
    status: restaurantStatus,
    error: restaurantError,
  } = useSelector((state: RootState) => state.restaurantData);
  const {
    foodData,
    foodDatas,
    status: foodDataStatus,
    error: foodDataError,
  } = useSelector((state: RootState) => state.foodCatalogue);

  const currencies = [
    "GBP",
    "USD",
    "EUR",
    "CAD",
    "AUD",
    "JPY",
    "CNY",
    "KRW",
    "MYR",
    "TWD",
    "VND",
    "THB",
    "ZAR",
  ];
  const DefaultFoodData = {
    name: "",
    ingredients: [],
    cuisineType: "",
    course: "",
    price: {
      currency: currencies[0],
      amount: 0,
    },
    allergens: [],
    images: [],
    restaurant: "",
  };

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const [newFood, setNewFood] = useState<FoodData>(DefaultFoodData);

  // functions for modal
  const handleAddFood = async () => {
    if (newFood.name && newFood.cuisineType && newFood.course) {
      console.log(newFood);
      dispatch(createFoodCatalogue(newFood));

      setIsModalOpen(false);
      setNewFood(DefaultFoodData);
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

  const handleAddIngredients = (ingredient: string) => {
    if (!ingredient) {
      return;
    }
    if (newFood.ingredients.includes(ingredient)) {
      setFormError("ingredient already included");
      return;
    }

    setNewFood((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient],
    }));
    setIngredient("");
    setFormError("");
  };

  const handleRemoveIngredients = (ingredient: string): void => {
    setNewFood((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== ingredient),
    }));
  };

  const handleImageUpload = (): void => {
    // Handle image upload logic here
  };

  // functions for table

  const handleRowClick = (id: string) => {
    router.push(`food-catalogue/${id}`);
  };

  useEffect(() => {
    dispatch(getAllergens());
    dispatch(getCuisine());
    dispatch(getCourse());

    // Fetch foods data from the server here and update the foods state accordingly.
  }, [dispatch]);

  useEffect(() => {
    if (restaurantData._id) {
      setNewFood({ ...newFood, restaurant: restaurantData?._id });
      dispatch(getFoodCatalogue(restaurantData?._id));
    }
  }, [dispatch, restaurantData, foodData]);

  console.log(foodDatas);

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
      <Table foodDatas={foodDatas} handleRowClick={handleRowClick} />

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
          currencies={currencies}
          handleAddIngredients={handleAddIngredients}
          handleRemoveIngredients={handleRemoveIngredients}
          setIngredient={setIngredient}
          ingredient={ingredient}
        />
      )}
    </div>
  );
}

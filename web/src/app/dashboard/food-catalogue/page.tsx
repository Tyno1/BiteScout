"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/dashboard/food-catalogue/Table";
import Modal from "@/components/ui/dashboard/food-catalogue/Modal";
import { FoodData } from "@/types/foodCatalogue";
import useFoodDataStore from "@/stores/foodDataStore";
import useAllergenStore from "@/stores/allergenStore";
import useCuisineStore from "@/stores/cuisineStore";
import useCourseStore from "@/stores/courseStore";
import useRestaurantStore from "@/stores/restaurantStore";

export type formErrorType = Partial<{
  name: string;
  ingredients: string;
  cuisineType: string;
  course: string;
  price: string;
  allergens: string;
  images: string;
  restaurant: string;
}>;

export default function FoodCatalogueManagement(): React.ReactElement {
  const CURRENCIES = [
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
  const DEFAULT_FOOD_DATA = {
    name: "",
    ingredients: [],
    cuisineType: "",
    course: "",
    price: {
      currency: CURRENCIES[0],
      amount: 0,
    },
    allergens: [],
    images: [],
    restaurant: "",
  };
  const DEFAULT_FORM_ERROR = {
    name: "",
    ingredients: "",
    cuisineType: "",
    course: "",
    price: "",
    allergens: "",
    images: "",
    restaurant: "",
  };

  const { foodDatas, createFoodData, getFoodDatas, error, isLoading } =
    useFoodDataStore();
  const { restaurantData } = useRestaurantStore();
  const {
    allergens,
    getAllergens,
    error: allergenError,
    isLoading: allergenLoading,
  } = useAllergenStore();

  const {
    cuisines,
    getCuisines,
    error: cuisineError,
    isLoading: cuisineLoading,
  } = useCuisineStore();
  const {
    courses,
    getCourses,
    error: courseError,
    isLoading: courseLoading,
  } = useCourseStore();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<string>("");
  const [formError, setFormError] = useState<formErrorType>(DEFAULT_FORM_ERROR);
  const [newFood, setNewFood] = useState<FoodData>(DEFAULT_FOOD_DATA);

  // functions for modal
  const handleAddFood = async () => {
    const errors: formErrorType = {
      name: !newFood.name ? "Name is required" : "",
      ingredients:
        newFood.ingredients.length < 1 ? "Ingredients are required" : "",
      cuisineType: !newFood.cuisineType ? "Cuisine type is required" : "",
      course: !newFood.course ? "Course is required" : "",
      price:
        !newFood.price.amount || !newFood.price.currency
          ? "Price is required"
          : "",
      allergens: newFood.allergens.length < 1 ? "Allergens are required" : "",
      images: !newFood.images ? "At least one image is required" : "",
      restaurant: !newFood.restaurant ? "Restaurant is required" : "",
    };

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setFormError(errors);
      console.log(errors);
      return;
    }

    // If no errors, proceed with form submission
    createFoodData(newFood);
    setIsModalOpen(false);
    setNewFood(DEFAULT_FOOD_DATA);
    setFormError(DEFAULT_FORM_ERROR);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFood(DEFAULT_FOOD_DATA);
    setFormError(DEFAULT_FORM_ERROR);
  };
  // create a component for form warning
  const FormWarning = (message: string) => {
    return <div className="text-xs text-red">{message}</div>;
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
      setFormError({ ingredients: "ingredient already included" });
      return;
    }

    setNewFood((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient],
    }));
    setIngredient("");
    setFormError((prev) => ({ ...prev, ingredients: "" }));
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
    getCuisines();
    getCourses();
    getAllergens();
    // Fetch foods data from the server here and update the foods state accordingly.
  }, []);

  useEffect(() => {
    if (restaurantData?._id) {
      setNewFood({ ...newFood, restaurant: restaurantData?._id });
      getFoodDatas(restaurantData?._id);
    }
  }, [restaurantData, foodDatas]);

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
          cuisineData={cuisines}
          courseData={courses}
          allergenData={allergens}
          handleAddFood={handleAddFood}
          handleImageUpload={handleImageUpload}
          toggleAllergen={toggleAllergen}
          currencies={CURRENCIES}
          handleAddIngredients={handleAddIngredients}
          handleRemoveIngredients={handleRemoveIngredients}
          setIngredient={setIngredient}
          ingredient={ingredient}
          formError={formError}
          FormWarning={FormWarning}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

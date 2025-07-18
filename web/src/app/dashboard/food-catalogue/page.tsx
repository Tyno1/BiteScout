"use client";

import { Button } from "@/components/atoms";
import { Modal } from "@/components/organisms";
import { AddNewFood, Table } from "@/components/ui";
import useAllergenStore from "@/stores/allergenStore";
import useCourseStore from "@/stores/courseStore";
import useCuisineStore from "@/stores/cuisineStore";
import useFoodDataStore, { DEFAULT_FOOD_DATA } from "@/stores/foodDataStore";
import useRestaurantStore from "@/stores/restaurantStore";
// import useRestaurantStore from "@/stores/restaurantStore";
import type { Allergen, FoodCatalogue } from "@shared/types/api/schemas";
import type { Currency } from "@shared/types/common";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

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
  const CURRENCIES: Currency[] = [
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
  const [newFood, setNewFood] = useState<FoodCatalogue>(DEFAULT_FOOD_DATA);

  // functions for modal
  const handleAddFood = async () => {
    const errors: formErrorType = {
      name: !newFood.name ? "Name is required" : "",
      ingredients:
        newFood.ingredients.length < 1 ? "Ingredients are required" : "",
      cuisineType: !newFood.cuisineType.name ? "Cuisine type is required" : "",
      course: !newFood.course.name  ? "Course is required" : "",
      price:
        !newFood.price.amount || !newFood.price.currency
          ? "Price is required"
          : "",
    
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
    return <div className="text-xs text-destructive">{message}</div>;
  };

  const toggleAllergen = (allergen: Allergen): void => {
    setNewFood((prev) => ({
      ...prev,
      allergens: (prev.allergens || []).some((a) => a._id === allergen._id)
        ? (prev.allergens || []).filter((a) => a._id !== allergen._id)
        : [...(prev.allergens || []), allergen],
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
  }, [getCuisines, getCourses, getAllergens]);



  useEffect(() => {
    if (restaurantData?._id) {
      console.log("Fetching food data for restaurant:", restaurantData._id);

      setNewFood((prev) => ({
        ...prev,
        restaurant: restaurantData._id as string,
      }));
      getFoodDatas(restaurantData?._id);
    }
  }, [restaurantData, getFoodDatas]);

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Catalogue</h1>

        {foodDatas && foodDatas.length > 0 ? (
          <Button
            variant="solid"
            text="Add New Item"
            onClick={() => setIsModalOpen(true)}
          />
        ) : null}
      </div>

      {/* Initial Loading State - Show only one loading message */}
      {(isLoading || allergenLoading || cuisineLoading || courseLoading) &&
        !foodDatas && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
              <span>Setting up your food catalogue...</span>
            </div>
          </div>
        )}

      {/* Error State - Only show critical errors */}
      {(error || allergenError || cuisineError || courseError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Setup Issue</h3>
              <div className="mt-2 text-sm text-red-700">
                {error && <p>Food data: {error}</p>}
                {allergenError && <p>Allergens: {allergenError}</p>}
                {cuisineError && <p>Cuisines: {cuisineError}</p>}
                {courseError && <p>Courses: {courseError}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Food Catalogue Table */}
      {foodDatas && foodDatas.length > 0 ? (
        <Table foodDatas={foodDatas} handleRowClick={handleRowClick} />
      ) : !isLoading &&
        !allergenLoading &&
        !cuisineLoading &&
        !courseLoading ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Welcome to your Food Catalogue!
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your menu by adding your first food item. You can
              include ingredients, allergens, pricing, and images.
            </p>
            <Button
              variant="solid"
              text="Add Your First Food Item"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center"
            />
          </div>
        </div>
      ) : null}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          modalTitle="Add New Food Item"
          modalActionText="Add Food"
          modalActionOnClick={handleAddFood}
          closeModal={closeModal}
        >
          <AddNewFood
            setNewFood={setNewFood}
            newFood={newFood}
            cuisineData={cuisines}
            courseData={courses}
            allergenData={allergens}
            handleImageUpload={handleImageUpload}
            toggleAllergen={toggleAllergen}
            currencies={CURRENCIES}
            handleAddIngredients={handleAddIngredients}
            handleRemoveIngredients={handleRemoveIngredients}
            setIngredient={setIngredient}
            ingredient={ingredient}
            formError={formError}
            FormWarning={FormWarning}
          />
        </Modal>
      )}
    </div>
  );
}

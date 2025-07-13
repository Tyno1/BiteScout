"use client";

import { Button } from "@/components/atoms";
import { Modal } from "@/components/organisms";
import { AddNewFood, Table } from "@/components/ui";
import useAllergenStore from "@/stores/allergenStore";
import useCourseStore from "@/stores/courseStore";
import useCuisineStore from "@/stores/cuisineStore";
import useFoodDataStore from "@/stores/foodDataStore";
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import useRestaurantStore from "@/stores/restaurantStore";
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
  const DEFAULT_FOOD_DATA: FoodCatalogue = {
    name: "",
    ingredients: [],
    cuisineType: { name: "", description: "" },
    course: { name: "", description: "" },
    price: {
      currency: "GBP" as Currency,
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
  const [newFood, setNewFood] = useState<FoodCatalogue>(DEFAULT_FOOD_DATA);

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
      allergens:
        !newFood.allergens || newFood.allergens.length < 1
          ? "Allergens are required"
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
    return <div className="text-xs text-red">{message}</div>;
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

        <Button
          variant="solid"
          text="Add New Item"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Loading Messages */}
      {isLoading && (
        <div className="text-blue-500 mb-4">Loading food data...</div>
      )}
      {allergenLoading && (
        <div className="text-blue-500 mb-4">Loading allergens...</div>
      )}
      {cuisineLoading && (
        <div className="text-blue-500 mb-4">Loading cuisines...</div>
      )}
      {courseLoading && (
        <div className="text-blue-500 mb-4">Loading courses...</div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="text-red-500 mb-4">Food Data Error: {error}</div>
      )}
      {allergenError && (
        <div className="text-red-500 mb-4">
          Allergens Error: {allergenError}
        </div>
      )}
      {cuisineError && (
        <div className="text-red-500 mb-4">Cuisines Error: {cuisineError}</div>
      )}
      {courseError && (
        <div className="text-red-500 mb-4">Courses Error: {courseError}</div>
      )}

      {/* Food Catalogue Table */}
      {foodDatas && foodDatas.length > 0 ? (
        <Table foodDatas={foodDatas} handleRowClick={handleRowClick} />
      ) : !isLoading ? (
        <div className="text-center py-8 text-gray-500">
          No food items found. Add some food items to get started.
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

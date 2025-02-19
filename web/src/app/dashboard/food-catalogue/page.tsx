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

export interface formErrorType {
  name: string;
  ingredients: string;
  cuisineType: string;
  course: string;
  price: string;
  allergens: string;
  images: string;
  restaurant: string;
}

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
    cuisineType: {
      name: "",
      description: "",
    },
    course: { name: "", description: "" },
    price: {
      currency: currencies[0],
      amount: 0,
    },
    allergens: [],
    images: [],
    restaurant: "",
  };
  const DefaultFormError = {
    name: "",
    ingredients: "",
    cuisineType: "",
    course: "",
    price: "",
    allergens: "",
    images: "",
    restaurant: "",
  };

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<string>("");
  const [formError, setFormError] = useState<formErrorType>(DefaultFormError);

  const [newFood, setNewFood] = useState<FoodData>(DefaultFoodData);

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
    dispatch(createFoodCatalogue(newFood));
    setIsModalOpen(false);
    setNewFood(DefaultFoodData);
    setFormError(DefaultFormError);
  };
  // create a component for form warning
  const FormWarning = ({}) => {
    return <div>

    </div>;
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
          formError={formError}
        />
      )}
    </div>
  );
}

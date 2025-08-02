"use client";

import { Alert, Button } from "@/components/atoms";
import { type TabItem, Tabs } from "@/components/molecules/Tabs/Tabs";
import { Modal } from "@/components/organisms";
import { AddNewFood, Table } from "@/components/ui";
import { MediaUpload } from "@/components/ui/media";
import type { FileWithPreview } from "@/components/ui/media/media-upload/types";
import useAllergenStore from "@/stores/allergenStore";
import useCourseStore from "@/stores/courseStore";
import useCuisineStore from "@/stores/cuisineStore";
import useFoodDataStore, { DEFAULT_FOOD_DATA } from "@/stores/foodDataStore";
import useRestaurantStore from "@/stores/restaurantStore";
import {  uploadFile } from "@/utils/mediaApi";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { UploadMediaResponse } from "shared/types";
import type { Allergen, FoodCatalogue } from "shared/types/api/schemas";
import type { Currency } from "shared/types/common";
import { z } from "zod";

// Zod validation schema
const foodCatalogueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  cuisineType: z.object({
    name: z.string().min(1, "Cuisine type is required"),
    description: z.string().optional(),
    _id: z.string().optional(),
  }),
  course: z.object({
    name: z.string().min(1, "Course is required"),
    description: z.string().optional(),
    _id: z.string().optional(),
  }),
  price: z.object({
    amount: z.number().positive("Price amount must be positive"),
    currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY", "KRW", "MYR", "TWD", "VND", "THB", "ZAR"]),
  }),
  restaurant: z.string().min(1, "Restaurant is required"),
  allergens: z.array(z.any()).optional(),
  images: z.array(z.string()).optional(),
}) satisfies z.ZodType<FoodCatalogue>;


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
  const [activeTab, setActiveTab] = useState<string>("food-data");
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [ingredient, setIngredient] = useState<string>("");
  const [formError, setFormError] = useState<formErrorType>(DEFAULT_FORM_ERROR);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<FileWithPreview[]>([]);
  const [newFood, setNewFood] = useState<FoodCatalogue>({
    ...DEFAULT_FOOD_DATA,
    restaurant: restaurantData?._id || "",
  });

  const validateForm = (): boolean => {
    // Validate form data using Zod
    const validationResult = foodCatalogueSchema.safeParse(newFood);
    console.log(validationResult.error?.errors);
    
    if (!validationResult.success) {
      // Convert Zod errors to form error format
      const errors: formErrorType = {};
      for (const error of validationResult.error.errors) {
        const field = error.path[0] as keyof formErrorType;
        errors[field] = error.message;
      }
      console.log(errors);
      
      setFormError(errors);
      setIsSubmitting(false);
      return false; // Validation failed
    }

    // Clear errors if validation passes
    setFormError(DEFAULT_FORM_ERROR);
    return true; // Validation passed
  };
  // functions for modal
    const handleAddFood = async () => {
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    setIsUploadingImages(false);
    setUploadProgress(0);

    try {
      // Validate form first
      if (!validateForm()) {
        return; // Validation failed, errors are already set
      }

      // Upload selected images first
      const uploadedImageIds: string[] = [];
      if (selectedMediaFiles.length > 0) {
        setIsUploadingImages(true);
        try {
          let completedUploads = 0;
          const totalUploads = selectedMediaFiles.length;

          const uploadPromises = selectedMediaFiles.map(async (fileWithPreview, index) => {
            const metadata = {
              title: fileWithPreview.title || undefined,
              description: fileWithPreview.description || undefined,
              tags: fileWithPreview.tags ? fileWithPreview.tags.split(',').map(tag => tag.trim()) : undefined,
              folder: "food-images",
            };

            const result = await uploadFile(fileWithPreview.file, metadata);
            completedUploads++;
            setUploadProgress(Math.round((completedUploads / totalUploads) * 100));
            return result._id;
          });

          const results = await Promise.all(uploadPromises);
          uploadedImageIds.push(...results.filter((id: string | undefined) => id) as string[]);
        } catch (uploadError) {
          console.error("Failed to upload images:", uploadError);
          // Continue with food creation even if image upload fails
        } finally {
          setIsUploadingImages(false);
        }
      }

      // Prepare food data for backend with uploaded image IDs
      const foodDataForBackend = {
        ...newFood,
        restaurant: restaurantData?._id || "",
        images: uploadedImageIds,
      };

      // Create the food
      const result = await createFoodData(foodDataForBackend);

      if (result.success && result.data) {
        // Note: Media association is handled automatically by the backend during upload
        // The uploadedImageIds are already included in the food data

        // Close modal and reset form
        setIsModalOpen(false);
        setNewFood({
          ...DEFAULT_FOOD_DATA,
          restaurant: restaurantData?._id || "",
        });
        setFormError(DEFAULT_FORM_ERROR);
        setSelectedMediaFiles([]);
      } else {
        console.error("Failed to create food:", result.error);
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Failed to create food:", error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
      setIsUploadingImages(false);
      setUploadProgress(0);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFood({
      ...DEFAULT_FOOD_DATA,
      restaurant: restaurantData?._id || "",
    });
    setFormError(DEFAULT_FORM_ERROR);
    setSelectedMediaFiles([]);
    setIsUploadingImages(false);
    setUploadProgress(0);
    setActiveTab("food-data"); // Reset to first tab
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

  const handleMediaUploadSuccess = (result: UploadMediaResponse) => {
    // Also add the media ID to the food data
    if (result._id) {
      setNewFood(prev => ({
        ...prev,
        images: [...(prev.images || []), result._id as string]
      }));
    }
  };



  // functions for table

  const handleRowClick = (id: string) => {
    if (restaurantData?._id) {
      router.push(`food-catalogue/${restaurantData._id}/${id}`);
    }
  };

  const tabs: TabItem[] = [
    {
      key: "food-data",
      label: "Food Data",
      content: (
        <AddNewFood
          setNewFood={setNewFood}
          newFood={newFood}
          cuisineData={cuisines}
          courseData={courses}
          allergenData={allergens}
          toggleAllergen={toggleAllergen}
          currencies={CURRENCIES}
          handleAddIngredients={handleAddIngredients}
          handleRemoveIngredients={handleRemoveIngredients}
          setIngredient={setIngredient}
          ingredient={ingredient}
          formError={formError}
          FormWarning={FormWarning}
        />
      ),
    },
    {
      key: "media-upload",
      label: "Media Upload",
      content: (
        <MediaUpload 
          uploadMode="auto"
          selectedFiles={selectedMediaFiles}
          onSelectedFilesChange={setSelectedMediaFiles}
          onUploadError={(error) => console.error("Upload error:", error)}
        />
      ),
    },
  ];

  // Stabilize the functions to prevent unnecessary re-renders
  const stableGetCuisines = useCallback(() => {
    getCuisines();
  }, [getCuisines]);

  const stableGetCourses = useCallback(() => {
    getCourses();
  }, [getCourses]);

  const stableGetAllergens = useCallback(() => {
    getAllergens();
  }, [getAllergens]);

  useEffect(() => {
    stableGetCuisines();
    stableGetCourses();
    stableGetAllergens();
  }, [stableGetCuisines, stableGetCourses, stableGetAllergens]);

  // Stabilize the getFoodDatas function
  const stableGetFoodDatas = useCallback(
    (restaurantId: string) => {

      getFoodDatas(restaurantId);
    },
    [getFoodDatas]
  );

  useEffect(() => {
    if (restaurantData?._id) {
      console.log("Fetching food data for restaurant:", restaurantData._id);

      setNewFood((prev) => ({
        ...prev,
        restaurant: restaurantData._id as string,
      }));
      
      stableGetFoodDatas(restaurantData._id);
    }
  }, [restaurantData?._id, stableGetFoodDatas]); // Only depend on restaurantData._id, not the entire object

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
      {
        <Modal
          modalDescription={
            Object.values(formError).some(error => error && error.length > 0) ? (
              <Alert status="error">
                Please fill in all the fields
              </Alert>
            ) : isUploadingImages ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600">Uploading images...</span>
                  <span className="text-blue-600 font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  {selectedMediaFiles.length} image{selectedMediaFiles.length > 1 ? 's' : ''} being uploaded
                </p>
              </div>
            ) : undefined
          }
          size="lg"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalTitle="Add New Food Item"
          modalActionText={
            activeTab === tabs[tabs.length - 1].key 
              ? isUploadingImages 
                ? "Uploading Images..." 
                : isSubmitting 
                  ? "Creating Food..." 
                  : "Add Food"
              : "Next Step"
          }
          modalActionOnClick={()=>{
            if(activeTab === tabs[tabs.length - 1].key){
              handleAddFood();
            }else{
              if(validateForm()){
                const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
                setActiveTab(tabs[currentIndex + 1].key);
              }
            }
          }}
          closeModal={closeModal}
          isSubmitting={isSubmitting || isUploadingImages}
        >
          <Tabs 
            tabs={tabs} 
            defaultTab="food-data" 
            selectedTab={activeTab}
            onTabChange={(tabKey) => setActiveTab(tabKey)} 
          />
        </Modal>
      }
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { FoodCatalogue } from "shared/types/api/schemas";
import type { Currency } from "shared/types/common";
import { Alert, Button } from "@/components/atoms";
import { AlertModal } from "@/components/molecules";
import { type TabItem, Tabs } from "@/components/molecules/Tabs/Tabs";
import { Modal } from "@/components/organisms";
import { AddNewFood } from "@/components/ui";
import { MediaUpload } from "@/components/ui/media";
import { useAllergens } from "@/hooks/allergens";
import { useCourses } from "@/hooks/courses";
import { useCuisines } from "@/hooks/cuisines";
import {
  useDeleteFoodCatalogue,
  useFoodCatalogueByRestaurant,
  useFoodCatalogueForm,
} from "@/hooks/food-catalogue";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";

const FoodCatalogueList = dynamic(
  () =>
    import("@/components/ui/dashboard/food-catalogue/FoodCatalogueList").then((mod) => ({
      default: mod.FoodCatalogueList,
    })),
  {
    loading: () => (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading food catalogue...</p>
      </div>
    ),
  }
);

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

  const { restaurantData } = useRestaurantAccess();
  const {
    data: foodDatas,
    error,
    isLoading,
  } = useFoodCatalogueByRestaurant(restaurantData?._id || "");

  // Modal state
  const [activeTab, setActiveTab] = useState<string>("food-data");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingFood, setEditingFood] = useState<FoodCatalogue | undefined>(undefined);

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Form hook with business logic
  const {
    newFood,
    formError,
    ingredient,
    selectedMediaFiles,
    existingImages,
    isLoadingExistingImages,
    isSubmitting,
    isUploadingImages,
    uploadProgress,
    hasFormErrors,
    modalTitle,
    submitButtonText,
    setNewFood,
    setIngredient,
    setSelectedMediaFiles,
    handleRemoveExistingImage,
    handleSubmitFood,
    toggleAllergen,
    handleAddIngredients,
    handleRemoveIngredients,
    resetForm,
    validateForm,
  } = useFoodCatalogueForm({
    restaurantId: restaurantData?._id || "",
    mode: formMode,
    initialData: editingFood,
    foodId: editingFood?._id,
    onSuccess: () => {
      setIsModalOpen(false);
      setActiveTab("food-data");
      setFormMode("create");
      setEditingFood(undefined);
    },
  });
  const {
    data: allergens,
    refetch: getAllergens,
    error: allergenError,
    isLoading: allergenLoading,
  } = useAllergens();

  const {
    data: cuisines,
    refetch: getCuisines,
    error: cuisineError,
    isLoading: cuisineLoading,
  } = useCuisines();
  const {
    data: courses,
    refetch: getCourses,
    error: courseError,
    isLoading: courseLoading,
  } = useCourses();

  const router = useRouter();

  // Modal handlers
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
    setActiveTab("food-data");
  }, [resetForm]);

  // Form warning component
  const FormWarning = useCallback((message: string) => {
    return <div className="text-xs text-destructive">{message}</div>;
  }, []);

  // Handler for opening modal in create mode
  const handleAddFood = useCallback(() => {
    setFormMode("create");
    setEditingFood(undefined);
    setIsModalOpen(true);
    setActiveTab("food-data");
  }, []);

  // Handler for opening modal in edit mode
  const handleEditFood = useCallback(
    (id: string) => {
      const foodToEdit = foodDatas?.find((food) => food._id === id);
      if (foodToEdit) {
        setFormMode("update");
        setEditingFood(foodToEdit);
        setIsModalOpen(true);
        setActiveTab("food-data");
      } else {
        console.error("Food item not found for editing:", id);
      }
    },
    [foodDatas]
  );

  const handleRowClick = (id: string) => {
    if (restaurantData?._id) {
      router.push(`food-catalogue/${restaurantData._id}/${id}`);
    }
  };

  const deleteFoodMutation = useDeleteFoodCatalogue();

  const handleDeleteFood = useCallback((id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (itemToDelete && restaurantData?._id) {
      deleteFoodMutation.mutate({
        restaurantId: restaurantData._id,
        foodId: itemToDelete,
      });
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  }, [itemToDelete, restaurantData?._id, deleteFoodMutation]);

  const tabs: TabItem[] = [
    {
      key: "food-data",
      label: "Food Data",
      content: (
        <AddNewFood
          setNewFood={setNewFood}
          newFood={newFood}
          cuisineData={cuisines || []}
          courseData={courses || []}
          allergenData={allergens || []}
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
        <div className="space-y-4">
          {isLoadingExistingImages && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
              <span>Loading existing images...</span>
            </div>
          )}
          <MediaUpload
            uploadMode="auto"
            selectedFiles={selectedMediaFiles}
            uploadedFiles={existingImages}
            onSelectedFilesChange={setSelectedMediaFiles}
            onRemoveUploadedFile={handleRemoveExistingImage}
            onUploadError={(error) => console.error("Upload error:", error)}
          />
        </div>
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

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Catalogue</h1>

        {foodDatas && foodDatas.length > 0 ? (
          <Button size="sm" variant="solid" text="Create New" onClick={handleAddFood} />
        ) : null}
      </div>

      {/* Loading State - Show only when any data is loading */}
      {(isLoading || allergenLoading || cuisineLoading || courseLoading) && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
            <span>Setting up your food catalogue...</span>
          </div>
        </div>
      )}

      {/* Error State - Only show critical errors */}
      {(error || allergenError || cuisineError || courseError) && (
        <div className="bg-danger border border-danger/20 rounded-lg p-4 mb-6">
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
                {error && <p>Food data: {error.message}</p>}
                {allergenError && <p>Allergens: {allergenError.message}</p>}
                {cuisineError && <p>Cuisines: {cuisineError.message}</p>}
                {courseError && <p>Courses: {courseError.message}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Food Catalogue Display - Only show when not loading */}
      {!isLoading &&
        !allergenLoading &&
        !cuisineLoading &&
        !courseLoading &&
        (foodDatas && foodDatas.length > 0 ? (
          <FoodCatalogueList
            foodDatas={foodDatas}
            handleRowClick={handleRowClick}
            handleDelete={handleDeleteFood}
            handleEdit={handleEditFood}
          />
        ) : foodDatas && foodDatas.length === 0 ? (
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
              <h3 className="text-lg font-medium text-foreground mb-2">
                Welcome to your Food Catalogue!
              </h3>
              <p className="text-foreground/80 mb-6">
                Start building your menu by adding your first food item. You can include
                ingredients, allergens, pricing, and images.
              </p>
              <Button
                variant="solid"
                text="Add Your First Food Item"
                onClick={handleAddFood}
                className="inline-flex items-center"
              />
            </div>
          </div>
        ) : null)}

      {/* Delete Confirmation Modal */}
      <AlertModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        title="Delete Food Item"
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        isLoading={deleteFoodMutation.isPending}
      >
        <div>
          <p className="mb-2">Are you sure you want to delete this food item?</p>
          <p className="text-sm text-red-600">
            This action cannot be undone and will remove the item from your menu.
          </p>
        </div>
      </AlertModal>

      {/* Modal */}
      <Modal
        modalDescription={
          hasFormErrors ? (
            <Alert status="error">Please fill in all the fields</Alert>
          ) : isUploadingImages ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Uploading images...</span>
                <span className="text-secondary font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-secondary/20 rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-foreground">
                {selectedMediaFiles.length} image
                {selectedMediaFiles.length > 1 ? "s" : ""} being uploaded
              </p>
            </div>
          ) : undefined
        }
        size="lg"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalTitle={modalTitle}
        modalActionText={
          activeTab === tabs[tabs.length - 1].key
            ? isUploadingImages
              ? "Uploading Images..."
              : isSubmitting
                ? "Creating Food..."
                : submitButtonText
            : "Next Step"
        }
        modalActionOnClick={() => {
          if (activeTab === tabs[tabs.length - 1].key) {
            handleSubmitFood();
          } else {
            if (validateForm()) {
              const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
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
    </main>
  );
}

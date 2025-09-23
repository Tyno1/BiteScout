import { getMedia } from "@/api/media/queries";
import type { FileWithPreview } from "@/components/ui/media/media-upload/types";
import { MediaFolder } from "@/components/ui/media/media-upload/types";
import { DEFAULT_FOOD_DATA } from "@/constants/foodData";
import { useMediaUpload } from "@/hooks/media";
import { useCallback, useEffect, useState } from "react";
import type { Allergen, FoodCatalogue } from "shared/types/api/schemas";
import type { CreateMediaResponse } from "shared/types/media/create";
import { z } from "zod";
import {
  useCreateFoodCatalogue,
  useUpdateFoodCatalogue,
} from "./mutations/useFoodCatalogueMutations";

// Zod validation schema
const foodCatalogueSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  cuisineType: z.object({
    name: z.string().min(1, "Please select a cuisine type"),
    description: z.string().optional(),
    _id: z.string().optional(),
  }),
  course: z.object({
    name: z.string().min(1, "Please select a course"),
    description: z.string().optional(),
    _id: z.string().optional(),
  }),
  price: z.object({
    amount: z.number().min(0.01, "Price must be greater than 0"),
    currency: z.enum([
      "USD",
      "EUR",
      "GBP",
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
    ]),
  }),
  restaurant: z.string().min(1, "Restaurant is required"),
  allergens: z.array(z.any()).optional(),
  images: z.array(z.string()).optional(),
}) satisfies z.ZodType<FoodCatalogue>;

export type FormErrorType = Partial<{
  name: string;
  ingredients: string;
  cuisineType: string;
  course: string;
  price: string;
  allergens: string;
  images: string;
  restaurant: string;
}>;

interface UseFoodCatalogueFormProps {
  restaurantId: string;
  mode: "create" | "update";
  initialData?: FoodCatalogue;
  foodId?: string;
  onSuccess?: () => void;
}

const DEFAULT_FORM_ERROR: FormErrorType = {
  name: "",
  ingredients: "",
  course: "",
  cuisineType: "",
  price: "",
  allergens: "",
  images: "",
  restaurant: "",
};

export const useFoodCatalogueForm = ({
  restaurantId,
  mode,
  initialData,
  foodId,
  onSuccess,
}: UseFoodCatalogueFormProps) => {
  // State - Initialize with existing data for update mode
  const [newFood, setNewFood] = useState<FoodCatalogue>(() => {
    if (mode === "update" && initialData) {
      return { ...initialData };
    }
    return {
      ...DEFAULT_FOOD_DATA,
      restaurant: restaurantId,
    };
  });
  const [formError, setFormError] = useState<FormErrorType>(DEFAULT_FORM_ERROR);
  const [ingredient, setIngredient] = useState<string>("");
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<FileWithPreview[]>([]);
  const [existingImages, setExistingImages] = useState<CreateMediaResponse[]>([]);
  const [isLoadingExistingImages, setIsLoadingExistingImages] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Mutations
  const createFoodDataMutation = useCreateFoodCatalogue();
  const updateFoodDataMutation = useUpdateFoodCatalogue();
  const uploadMutation = useMediaUpload();

  // Update form data when initialData changes (for update mode)
  useEffect(() => {
    if (mode === "update" && initialData) {
      setNewFood({ ...initialData });
    }
  }, [mode, initialData]);

  // Update restaurant ID when it becomes available
  useEffect(() => {
    if (restaurantId && newFood.restaurant !== restaurantId) {
      setNewFood((prev) => ({ ...prev, restaurant: restaurantId }));
    }
  }, [restaurantId, newFood.restaurant]);

  // Fetch existing images when in update mode
  const fetchExistingImages = useCallback(async (imageIds: string[]) => {
    if (!imageIds.length) {
      setExistingImages([]);
      return;
    }

    setIsLoadingExistingImages(true);
    try {
      const imagePromises = imageIds.map((id) => getMedia(id));
      const images = await Promise.all(imagePromises);

      // Convert GetMediaResponse to CreateMediaResponse format (they're the same now)
      const uploadResponseImages: CreateMediaResponse[] = images;

      setExistingImages(uploadResponseImages);
    } catch (error) {
      console.error("Failed to fetch existing images:", error);
      setExistingImages([]);
    } finally {
      setIsLoadingExistingImages(false);
    }
  }, []);

  // Load existing images when initialData changes in update mode
  useEffect(() => {
    if (mode === "update" && initialData?.images) {
      fetchExistingImages(initialData.images);
    } else {
      setExistingImages([]);
    }
  }, [mode, initialData?.images, fetchExistingImages]);

  // Validation
  const validateForm = useCallback((): boolean => {
    const validationResult = foodCatalogueSchema.safeParse(newFood);

    if (!validationResult.success) {
      const errors: FormErrorType = {};
      for (const error of validationResult.error.errors) {
        const field = error.path[0] as keyof FormErrorType;
        errors[field] = error.message;
      }
      setFormError(errors);
      return false;
    }

    setFormError(DEFAULT_FORM_ERROR);
    return true;
  }, [newFood]);

  const resetForm = useCallback(() => {
    if (mode === "update" && initialData) {
      setNewFood({ ...initialData });
      // Re-fetch existing images for update mode
      if (initialData.images) {
        fetchExistingImages(initialData.images);
      }
    } else {
      setNewFood({
        ...DEFAULT_FOOD_DATA,
        restaurant: restaurantId,
      });
      setExistingImages([]);
    }
    setFormError(DEFAULT_FORM_ERROR);
    setSelectedMediaFiles([]);
    setIngredient("");
    setIsUploadingImages(false);
    setUploadProgress(0);
  }, [mode, initialData, restaurantId, fetchExistingImages]);

  // Main submit handler - Works for both create and update
  const handleSubmitFood = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsUploadingImages(false);
    setUploadProgress(0);

    try {
      if (!validateForm()) {
        return;
      }

      // Upload images
      const uploadedImageIds: string[] = [];
      if (selectedMediaFiles.length > 0) {
        setIsUploadingImages(true);
        try {
          let completedUploads = 0;
          const totalUploads = selectedMediaFiles.length;

          const uploadPromises = selectedMediaFiles.map(async (fileWithPreview) => {
            const metadata = {
              title: fileWithPreview.title || undefined,
              description: fileWithPreview.description || undefined,
              tags: fileWithPreview.tags
                ? fileWithPreview.tags.split(",").map((tag) => tag.trim())
                : undefined,
              folder: MediaFolder.FOOD,
            };

            const result = await uploadMutation.mutateAsync({
              file: fileWithPreview.file,
              metadata,
            });

            completedUploads++;
            setUploadProgress(Math.round((completedUploads / totalUploads) * 100));
            return result._id;
          });

          const results = await Promise.all(uploadPromises);
          uploadedImageIds.push(...(results.filter((id: string | undefined) => id) as string[]));
        } catch (uploadError) {
          console.error("Failed to upload images:", uploadError);
        } finally {
          setIsUploadingImages(false);
        }
      }

      // Prepare data with uploaded images
      // For update mode: newFood.images already reflects removed images + we append new uploads
      // For create mode: only use new uploads
      const foodDataForBackend = {
        ...newFood,
        restaurant: restaurantId,
        images:
          mode === "update"
            ? [...(newFood.images || []), ...uploadedImageIds] // Current images (after removals) + new uploads
            : uploadedImageIds, // Only new uploads for create
      };

      // Call appropriate API based on mode
      let result: FoodCatalogue;
      if (mode === "create") {
        result = await createFoodDataMutation.mutateAsync(foodDataForBackend);
      } else {
        if (!foodId) throw new Error("Food ID required for update");
        result = await updateFoodDataMutation.mutateAsync({
          restaurantId,
          foodId,
          foodData: foodDataForBackend,
        });
      }

      if (result) {
        resetForm();
        onSuccess?.();
      }
    } catch (error) {
      console.error(`Failed to ${mode} food:`, error);
    } finally {
      setIsSubmitting(false);
      setIsUploadingImages(false);
      setUploadProgress(0);
    }
  }, [
    isSubmitting,
    validateForm,
    selectedMediaFiles,
    uploadMutation,
    newFood,
    restaurantId,
    mode,
    foodId,
    createFoodDataMutation,
    updateFoodDataMutation,
    onSuccess,
    resetForm,
  ]);

  const toggleAllergen = useCallback((allergen: Allergen): void => {
    setNewFood((prev) => ({
      ...prev,
      allergens: (prev.allergens || []).some((a) => a._id === allergen._id)
        ? (prev.allergens || []).filter((a) => a._id !== allergen._id)
        : [...(prev.allergens || []), allergen],
    }));
  }, []);

  const handleAddIngredients = useCallback(
    (ingredient: string) => {
      if (!ingredient) return;

      if (newFood.ingredients?.includes(ingredient)) {
        setFormError((prev) => ({ ...prev, ingredients: "ingredient already included" }));
        return;
      }

      setNewFood((prev) => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), ingredient],
      }));
      setIngredient("");
      setFormError((prev) => ({ ...prev, ingredients: "" }));
    },
    [newFood.ingredients]
  );

  const handleRemoveIngredients = useCallback((ingredient: string): void => {
    setNewFood((prev) => ({
      ...prev,
      ingredients: (prev.ingredients || []).filter((i) => i !== ingredient),
    }));
  }, []);

  // Handle removal of existing uploaded images
  const handleRemoveExistingImage = useCallback((index: number) => {
    setExistingImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // Also update newFood.images to reflect the removal
      const removedImageId = prev[index]?._id;
      if (removedImageId) {
        setNewFood((current) => ({
          ...current,
          images: current.images?.filter((id) => id !== removedImageId) || [],
        }));
      }

      return updated;
    });
  }, []);

  return {
    // State
    newFood,
    formError,
    ingredient,
    selectedMediaFiles,
    existingImages,
    isLoadingExistingImages,
    isSubmitting,
    isUploadingImages,
    uploadProgress,
    mode,

    // Actions
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

    // Computed
    hasFormErrors: Object.values(formError).some((error) => error && error.length > 0),
    submitButtonText: mode === "create" ? "Add Food" : "Update Food",
    modalTitle: mode === "create" ? "Add New Food Item" : "Update Food Item",
  };
};

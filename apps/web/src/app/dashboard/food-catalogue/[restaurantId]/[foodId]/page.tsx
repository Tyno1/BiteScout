"use client";

import { Button } from "@/components/atoms";
import { MediaGallery } from "@/components/ui/media";
import useFoodDataStore from "@/stores/foodDataStore";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

// Utility function to capitalize first character
const CapitalizeFirstCharacter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function FoodDetailPage() {
  const params = useParams();
  const { foodId, restaurantId } = params;
  const { foodData, getFoodDataById, isLoading, error } = useFoodDataStore();
  const router = useRouter();

  const fetchFoodData = useCallback(async () => {
    if (foodId && restaurantId) {
      try {
        await getFoodDataById({
          foodId: foodId as string,
          restaurantId: restaurantId as string,
        });
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    }
  }, [foodId, restaurantId, getFoodDataById]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  // Show error only if there's an actual error and we're not loading
  if (error && !isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error loading food data
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Show not found state if no food data and not loading
  if (!foodData || foodData._id === "") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">
            Food item not found
          </h1>
          <p className="text-gray-500 mt-2">
            The food item you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <div className="mt-6">
            <a
              href="/dashboard/food-catalogue"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to Food Catalogue
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-6 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Button
            onClick={() => router.back()}
            variant="plain"
            size="sm"
            className="text-gray-600 hover:text-gray-900 p-2"
            IconBefore={<ArrowLeft className="h-4 w-4" />}
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {CapitalizeFirstCharacter(foodData?.name || "")}
          </h1>
        </div>
        <p className="text-xs text-gray-500 mt-1 font-mono">ID: {foodData?._id}</p>
      </div>

      <div className="grid md:grid-cols-5 gap-4 items-start">
        {/* Left – Image */}
        <div className="md:col-span-2">
          {foodData?.images && foodData?.images?.length > 0 ? (
            <MediaGallery
              mediaIds={foodData.images}
              altText={foodData.name}
              showThumbnails={true}
              autoPlay={false}
              className="max-w-sm"
            />
          ) : (
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-base border shadow-inner max-w-sm">
              No image available
            </div>
          )}
        </div>

        {/* Right – Details */}
        <div className="md:col-span-3 space-y-6">
          {/* Price Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {foodData.price.currency} {foodData.price.amount}
              </span>
              <span className="text-xs text-gray-600">per serving</span>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700 text-sm">Cuisine Type</span>
                <span className="text-gray-900 font-semibold text-sm">{foodData.cuisineType.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700 text-sm">Course</span>
                <span className="text-gray-900 font-semibold text-sm">{foodData.course.name}</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {foodData.ingredients.map((ingredient: string, index: number) => (
                <span
                  key={`ingredient-${index}-${ingredient}`}
                  className="px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          {foodData.allergens && foodData.allergens.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
                Allergens
              </h2>
              <div className="flex flex-wrap gap-2">
                {foodData.allergens.map((allergen, index: number) => (
                  <span
                    key={`allergen-${index}-${allergen._id || allergen.name}`}
                    className="px-3 py-1 bg-red-50 text-red-900 rounded-full text-xs font-medium border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    {allergen.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant Information */}
          {foodData.restaurant && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
                Restaurant
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700 text-sm">Restaurant ID</span>
                  <span className="text-gray-900 font-mono text-xs">{foodData.restaurant}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

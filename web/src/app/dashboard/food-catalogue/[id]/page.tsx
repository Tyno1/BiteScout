"use client";

import useFoodDataStore from "@/stores/foodDataStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { getMediaAlt, getMediaUrl } from "@/types/media";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// Utility function to capitalize first character
const CapitalizeFirstCharacter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function FoodDetailPage() {
  const params = useParams();
  const { foodId, restaurantId } = params;
  const { foodData, getFoodDataById, isLoading, error } = useFoodDataStore();
  const { restaurantData } = useRestaurantStore();

  useEffect(() => {
    const fetchFoodData = async () => {
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
    };

    fetchFoodData();
  }, [foodId, restaurantId, getFoodDataById]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !foodData) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error loading food data</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-primary">
          {CapitalizeFirstCharacter(foodData?.name || "")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          ID: {foodData?._id}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left – Image */}
        <div>
          {/* create component to display and navigate images and open each on on click */}
          {foodData?.images && foodData?.images?.length > 0 ? (
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border shadow-sm">
              <Image
                src={getMediaUrl(foodData.images[0])}
                alt={getMediaAlt(foodData.images[0], foodData.name)}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-lg border shadow-inner">
              No image available
            </div>
          )}
        </div>

        {/* Right – Details */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2">{foodData.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Cuisine Type:</span>
                <span className="ml-2">{foodData.cuisineType.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Course:</span>
                <span className="ml-2">{foodData.course.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Price:</span>
                <span className="ml-2">
                  {foodData.price.currency} {foodData.price.amount}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {foodData.ingredients.map((ingredient: string, index: number) => (
                <span
                  key={`ingredient-${index}-${ingredient}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          {foodData.allergens && foodData.allergens.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Allergens</h2>
              <div className="flex flex-wrap gap-2">
                {foodData.allergens.map((allergen, index: number) => (
                  <span
                    key={`allergen-${index}-${allergen._id || allergen.name}`}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {allergen.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant Information */}
          {restaurantData && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Restaurant</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2">{restaurantData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="ml-2">{restaurantData.address}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2">{restaurantData.phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

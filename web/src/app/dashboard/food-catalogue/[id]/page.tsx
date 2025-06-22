"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import useFoodDataStore from "@/stores/foodDataStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { CapitalizeFirstCharacter } from "@/utils/typography";

export default function FoodDetailPage() {
  const { DetailedFoodData, error, getFoodDataById, isLoading } =
    useFoodDataStore();
  const { restaurantData } = useRestaurantStore();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (id && restaurantData?._id) {
      getFoodDataById({ foodId: id, restaurantId: restaurantData._id });
    }
  }, [id, restaurantData?._id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Failed to load food
        </h1>
        <p className="text-base text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <p>Food Name:</p>
        <h1 className="text-6xl font-bold text-primary">
          {CapitalizeFirstCharacter(DetailedFoodData?.name || "")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          ID: {DetailedFoodData?._id}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left – Image */}
        <div>
          {/* create component to display and navigate images and open each on on click */}
          {DetailedFoodData?.images && DetailedFoodData?.images?.length > 0 ? (
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border shadow-sm">
              <Image
                src={DetailedFoodData.images[0]}
                alt={DetailedFoodData.name}
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
        <div className="space-y-8">
          {/* Price */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Price</h2>
            <p className="text-2xl font-bold text-primary">
              {DetailedFoodData?.price.amount.toLocaleString("en-GB", {
                style: "currency",
                currency: DetailedFoodData?.price.currency,
              })}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-base text-gray-800">
              {DetailedFoodData?.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Cuisine and Course */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Cuisine
              </h3>
              <p className="text-base font-medium text-gray-900">
                {DetailedFoodData?.cuisineType.name}
              </p>
              <p className="text-sm text-gray-500">
                {DetailedFoodData?.cuisineType.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Course
              </h3>
              <p className="text-base font-medium text-gray-900">
                {DetailedFoodData?.course.name}
              </p>
              <p className="text-sm text-gray-500">
                {DetailedFoodData?.course.description}
              </p>
            </div>
          </div>

          {/* Allergens */}
          {DetailedFoodData?.allergens &&
            DetailedFoodData?.allergens?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Allergens
                </h2>
                <ul className="list-disc list-inside text-base text-gray-800">
                  {DetailedFoodData.allergens.map((al, i) => (
                    <li key={i}>{al.name}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

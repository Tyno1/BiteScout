"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import useFoodDataStore from "@/stores/foodDataStore";
import useRestaurantStore from "@/stores/restaurantStore";
import { CapitalizeFirstCharacter } from "@/utils/typography";

export default function FoodDetailPage() {
  const { foodData, error, getFoodDataById, isLoading } =
    useFoodDataStore();
  const { restaurantData } = useRestaurantStore();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (id && restaurantData?._id) {
      getFoodDataById({ foodId: id, restaurantId: restaurantData._id });
    }
  }, [id, restaurantData?._id, getFoodDataById]);

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
                src={foodData.images[0]}
                alt={foodData.name}
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
              {foodData?.price.amount.toLocaleString("en-GB", {
                style: "currency",
                currency: foodData?.price.currency,
              })}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-base text-gray-800">
              {foodData?.ingredients.map((ing: string, i: number) => (
                <li key={ing}>{ing}</li>
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
                {foodData?.cuisineType.name}
              </p>
              <p className="text-sm text-gray-500">
                {foodData?.cuisineType.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Course
              </h3>
              <p className="text-base font-medium text-gray-900">
                {foodData?.course.name}
              </p>
              <p className="text-sm text-gray-500">
                {foodData?.course.description}
              </p>
            </div>
          </div>

          {/* Allergens */}
          {foodData?.allergens &&
            foodData?.allergens?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Allergens
                </h2>
                <ul className="list-disc list-inside text-base text-gray-800">
                  {foodData.allergens.map((al) => (
                    <li key={al._id}>{al.name}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

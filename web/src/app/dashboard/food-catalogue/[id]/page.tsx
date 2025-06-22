"use client";

import { useApprovedAccess } from "@/app/hooks/useApprovedAccess";
import useFoodDataStore from "@/stores/foodDataStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const { DetailedFoodData, error, getFoodDataById, isLoading } = useFoodDataStore();
  const { restaurantId } = useApprovedAccess();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (id) {
      if (restaurantId) {
        getFoodDataById({ foodId: id, restaurantId });
      }
    }
  }, [id, restaurantId]);
  console.log(DetailedFoodData);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-6">Error loading data</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{DetailedFoodData?.name}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {DetailedFoodData?.images && DetailedFoodData?.images.length > 0 ? (
            <Image
              src={DetailedFoodData?.images[0] || "/placeholder.svg"}
              alt={DetailedFoodData?.name}
              width={500}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg w-full h-[400px] flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">
            {DetailedFoodData?.price.amount.toLocaleString("en-GB", {
              style: "currency",
              currency: DetailedFoodData?.price.currency,
            })}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {DetailedFoodData?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Cuisine Type</h2>
          <p className="mb-1">{DetailedFoodData?.cuisineType.name}</p>
          <p className="text-sm text-gray-600 mb-4">
            {DetailedFoodData?.cuisineType.description}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Course</h2>
          <p className="mb-1">{DetailedFoodData?.course.name}</p>
          <p className="text-sm text-gray-600 mb-4">
            {DetailedFoodData?.course.description}
          </p>

          {DetailedFoodData?.allergens &&
            DetailedFoodData?.allergens.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-2">Allergens</h2>
                <ul className="list-disc list-inside">
                  {DetailedFoodData?.allergens.map((allergen, index) => (
                    <li key={index}>{allergen.name}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

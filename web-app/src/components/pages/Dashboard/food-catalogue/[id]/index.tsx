

import { getFoodCatalogueById } from "@/state/foodCatalogueData/foodCatalogueSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Food = () => {
  const { foodData, error, status } = useSelector(
    (state: RootState) => state.foodCatalogue
  );
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(getFoodCatalogueById(id));
    }
  }, [dispatch, id]);
  console.log(foodData);

  if (status === "loading") {
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
      <h1 className="text-3xl font-bold mb-6">{foodData.name}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {foodData.images && foodData.images.length > 0 ? (
            <Image
              src={foodData?.images[0] || "/placeholder.svg"}
              alt={foodData.name}
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
            {foodData.price.amount.toLocaleString("en-GB", {
              style: "currency",
              currency: foodData.price.currency,
            })}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {foodData.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Cuisine Type</h2>
          <p className="mb-1">{foodData.cuisineType.name}</p>
          <p className="text-sm text-gray-600 mb-4">
            {foodData.cuisineType.description}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Course</h2>
          <p className="mb-1">{foodData.course.name}</p>
          <p className="text-sm text-gray-600 mb-4">
            {foodData.course.description}
          </p>

          {foodData.allergens.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Allergens</h2>
              <ul className="list-disc list-inside">
                {foodData.allergens.map((allergen, index) => (
                  <li key={index}>{allergen.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Food;

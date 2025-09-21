"use client";

import { Button } from "@/components/atoms";
import { MediaGallery } from "@/components/ui/media";
import { useFoodCatalogueById } from "@/hooks/food-catalogue";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Utility function to capitalize first character
const CapitalizeFirstCharacter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function FoodDetailPage() {
  const params = useParams();
  const { foodId, restaurantId } = params;
  const {
    data: foodData,
    isLoading,
    error,
  } = useFoodCatalogueById(restaurantId as string, foodId as string);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
        </div>
      </div>
    );
  }

  // Show error only if there's an actual error and we're not loading
  if (error && !isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error loading food data</h1>
          <p className="text-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  // Show not found state if no food data and not loading
  if (!foodData || foodData._id === "") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center text-foreground">
          <h1 className="text-2xl font-bold ">Food item not found</h1>
          <p className="mt-2">
            The food item you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button
            text="Back to Food Catalogue"
            onClick={() => router.back()}
            variant="plain"
            size="sm"
            className="text-gray-600 hover:text-gray-900 p-2"
            IconBefore={<ArrowLeft className="h-4 w-4" />}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="w-full mx-auto px-4 md:px-10 py-10 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Button
            onClick={() => router.back()}
            color="primary"
            variant="plain"
            size="sm"
            className="text-gray-600 hover:text-gray-900 p-2"
            IconBefore={<ArrowLeft className="h-4 w-4" />}
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {CapitalizeFirstCharacter(foodData?.name || "")}
          </h1>
        </div>
        <p className="text-xs text-foreground/30 mt-1 font-mono">ID: {foodData?._id}</p>
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
            <div className="aspect-[3/4] bg-foreground/20 rounded-xl flex items-center justify-center text-foreground/50 text-base border border-foreground/20 shadow-inner max-w-sm">
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
                {foodData.price?.currency} {foodData.price?.amount}
              </span>
              <span className="text-xs text-foreground">per serving</span>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 pb-1 border-b border-foreground/50">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-foreground/50">
                <span className="font-medium text-foreground text-sm">Cuisine Type</span>
                <span className="text-foreground font-semibold text-sm">
                  {foodData.cuisineType?.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-foreground/50">
                <span className="font-medium text-foreground text-sm">Course</span>
                <span className="text-foreground font-semibold text-sm">
                  {foodData.course?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 pb-1 border-b border-foreground/50">
              Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {foodData.ingredients?.map((ingredient: string, index: number) => (
                <span
                  key={`ingredient-${index}-${ingredient}`}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          {foodData.allergens && foodData.allergens.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 pb-1 border-b border-foreground/50">
                Allergens
              </h2>
              <div className="flex flex-wrap gap-2">
                {foodData.allergens?.map((allergen, index: number) => (
                  <span
                    key={`allergen-${index}-${allergen._id || allergen.name}`}
                    className="px-3 py-1 bg-red-50 text-danger rounded-full text-xs font-medium border border-danger/20 hover:bg-danger/10 transition-colors"
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
              <h2 className="text-lg font-semibold text-foreground mb-4 pb-1 border-b border-foreground/50">
                Restaurant
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-foreground/50">
                  <span className="font-medium text-foreground text-sm">Restaurant ID</span>
                  <span className="text-foreground font-mono text-xs">{foodData.restaurant}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

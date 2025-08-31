"use client";

import { Button, Input } from "@/components/atoms";
import { SearchResultCard } from "@/components/ui";
import { useRestaurantsByName } from "@/hooks/restaurant";
import { useRestaurantAccess } from "@/hooks/useRestaurantAccess";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const RestaurantSearch = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id;

  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    refetch: searchRestaurants,
    error: searchError,
  } = useRestaurantsByName(searchTerm);

  const { restaurantAccessList, createRestaurantAccess } =
    useRestaurantAccess();

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFormError("");

    if (e.target.value === "") {
      setHasSearched(false);
    }
  };

  // Handle search submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setFormError("Please enter a restaurant name");
      return;
    }

    setHasSearched(true);
    setFormError("");

    try {
      await searchRestaurants();
    } catch {
      setFormError("Error searching for restaurants");
    }
  };

  // Handle restaurant selection
  const handleRestaurantSelect = (restaurantId: string) => {
    if (!userId) {
      setFormError("You must be logged in to select a restaurant");
      return;
    }

    try {
      createRestaurantAccess({ restaurantId, userId });
    } catch (error) {
      setFormError("Failed to request access to this restaurant");
      console.error(error);
    }
  };

  // Render search results or appropriate message
  const renderSearchResults = () => {
    if (isSearchLoading) {
      return (
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (searchError) {
      return (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md">
          <p className="text-center text-red-700">
            Error: {searchError.message}
          </p>
        </div>
      );
    }

    if (hasSearched && (!searchResults || searchResults.length === 0)) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
          <p className="text-center text-yellow-700">
            No restaurants found matching &apos;{searchTerm}&apos;. Please try a
            different search term.
          </p>
        </div>
      );
    }

    if (hasSearched && searchResults && searchResults.length > 0) {
      return searchResults.map((restaurant) => (
        <SearchResultCard
          key={restaurant?._id}
          handleRestaurantSelect={handleRestaurantSelect}
          data={{ _id: restaurant._id ?? "", name: restaurant.name ?? "" }}
          restaurantAccessList={restaurantAccessList}
        />
      ));
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Search Restaurant
            </h1>
            <p className="text-sm text-gray-500">
              Enter your restaurant&apos;s name in the search bar below.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              name="restaurant-search"
              outlineType="bottom"
              placeholder="Restaurant Name"
              type="text"
              onChange={handleSearchChange}
              label="Restaurant search"
              id="restaurant-search"
              value={searchTerm}
              fullWidth
              inputSize="md"
            />
            <Button
              variant="solid"
              type="submit"
              text="Search"
              fullWidth
              disabled={isSearchLoading}
            />

            {formError && (
              <p className="text-center text-red-500">{formError}</p>
            )}
            <div className="mt-6 space-y-4">{renderSearchResults()}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantSearch;

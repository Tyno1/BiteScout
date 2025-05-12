"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button, Input } from "@/components/atoms";
import SearchResultCard from "../components/searchResultCard";
import useRestaurantStore from "@/stores/restaurantStore";
import useRestaurantAccessStore from "@/stores/restaurantAccessStore";
import { useSession } from "next-auth/react";

const RestaurantSearch = () => {
  // Session and store hooks
  const { data: session } = useSession();
  const userId = session?.user?._id;

  const {
    getRestaurantsByName,
    resetRestaurant,
    restaurantDatas,
    error: searchError,
    isLoading: isSearchLoading,
  } = useRestaurantStore();

  const { restaurantAccessList, getRestaurantAccess, createRestaurantAccess } =
    useRestaurantAccessStore();

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

<<<<<<< HEAD
  console.log("Restaurant Access List:", restaurantAccessList);
=======

>>>>>>> origin/webhook-notification

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFormError("");

    if (e.target.value === "") {
      resetRestaurant();
      setHasSearched(false);
    }
  };

  // Handle search submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setFormError("Please enter a restaurant name");
      setSearchTerm("");
      return;
    }

    setHasSearched(true);
    setFormError("");
    setIsSubmitting(true);

    try {
      await getRestaurantsByName(searchTerm);
    } catch (error) {
      setFormError("Error searching for restaurants");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle restaurant selection
  const handleRestaurantSelect = async (restaurantId: string) => {
    if (!userId) {
      setFormError("You must be logged in to select a restaurant");
      return;
    }

    try {
      await createRestaurantAccess({ restaurantId, userId });
    } catch (error) {
      setFormError("Failed to request access to this restaurant");
      console.error(error);
    }
  };

  // Fetch restaurant access on component mount
  useEffect(() => {
    const fetchRestaurantAccess = async () => {
      if (userId) {
        await getRestaurantAccess(userId);
      }
    };

    fetchRestaurantAccess();
  }, [userId, getRestaurantAccess]);

  // Redirect to dashboard if user has access to any restaurant
  useEffect(() => {
    if (restaurantAccessList.length > 0) {
      const isMatched = restaurantAccessList.find((access) =>
        restaurantDatas.find(
          (restaurant) =>
            restaurant?._id && access.restaurantId === restaurant?._id
        )
      );
      const hasAccess = isMatched?.status === "approved";

      if (hasAccess) {
<<<<<<< HEAD
        window.location.href = "/dashboard";
=======
        window.location.href = "/dashboard";  
>>>>>>> origin/webhook-notification
      }
    }
  }, [restaurantAccessList, restaurantDatas]);

  // Clear results when component mounts
  useEffect(() => {
    resetRestaurant();
    setHasSearched(false);
  }, [resetRestaurant]);

  // Render search results or appropriate message
  const renderSearchResults = () => {
    const isLoading = isSearchLoading || isSubmitting;

    if (isLoading) {
      return (
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (searchError) {
      return (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md">
          <p className="text-center text-red-700">Error: {searchError}</p>
        </div>
      );
    }

    if (hasSearched && restaurantDatas.length === 0) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
          <p className="text-center text-yellow-700">
            No restaurants found matching "{searchTerm}". Please try a different
            search term.
          </p>
        </div>
      );
    }

    if (hasSearched && restaurantDatas.length > 0) {
      return restaurantDatas.map((restaurant) => (
        <SearchResultCard
          key={restaurant?._id}
          handleRestaurantSelect={handleRestaurantSelect}
          data={restaurant}
          restaurantAccessList={restaurantAccessList}
          isSubmitting={isSubmitting}
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
              Enter your restaurant's name in the search bar below.
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
              disabled={isSubmitting}
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

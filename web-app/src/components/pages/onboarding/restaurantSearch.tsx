import { AppDispatch, RootState } from "@/state/store";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/atoms/buttons/Button";
import { getRestaurantsByName } from "@/state/restaurantData/restaurantDataSlice";
import { UserContext } from "@/providers/userContext";
import RestaurantCardItem from "./components/card";
import { createRestaurantAccess } from "@/state/restaurantAccess/restaurantAccessSlice";

const RestaurantSearch = () => {
  const { token, userData } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const { restaurantDatas, error, status } = useSelector(
    (state: RootState) => state.restaurantData
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFormError("");
    if (e.target.value === "") {
      dispatch({ type: "restaurantData/clearResults" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    setFormError("");
    if (!searchTerm.trim()) {
      setFormError("Please enter a restaurant name");
      setSearchTerm("");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(
        getRestaurantsByName({ name: searchTerm, token })
      ).unwrap();
    } catch (error) {
      setFormError("Error searching for restaurants");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestaurantSelect = async (restaurantId: string) => {
    try {
      if (!userData._id) {
        setFormError("User ID is required");
        return;
      }
      await dispatch(
        createRestaurantAccess({ restaurantId, userId: userData._id, token })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clear results when component mounts
    dispatch({ type: "restaurantData/clearResults" });
    setHasSearched(false);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6"
        >
          <div className=" mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Search Restaurant
            </h1>
            <p className="text-sm text-gray-500">
              Enter your restaurant's name in the search bar below.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-4 border-b-2 border-black rounded outline-none focus:ring-0 focus:border-b-2 focus:border-red transition-colors duration-200"
            />
            {formError && (
              <p className="text-center text-red-500">{formError}</p>
            )}
            <Button variant="solid" type="submit" text="Search" fullWidth />
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}
            {status === "loading" && isSubmitting && (
              <p className="text-center text-gray-600">
                Loading restaurants...
              </p>
            )}
            {/* handle an empty array result */}
            {hasSearched &&
              status === "succeeded" &&
              restaurantDatas.length === 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                  <p className="text-center text-yellow-700">
                    No restaurants found matching "{searchTerm}". Please try a
                    different search term.
                  </p>
                </div>
              )}

            {hasSearched &&
              status === "succeeded" &&
              restaurantDatas.length > 0 &&
              restaurantDatas.map((restaurant) => (
                <RestaurantCardItem
                  key={restaurant?._id}
                  handleRestaurantSelect={handleRestaurantSelect}
                  data={restaurant}
                />
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};
export default RestaurantSearch;

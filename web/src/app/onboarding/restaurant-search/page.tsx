"use client";

import { AppDispatch, RootState } from "@/state/store";
import { RestaurantList } from "@/types/restaurantData";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleCheck } from "lucide-react";
import Button from "@/components/buttons/Button";
import { getAllRestaurants } from "@/state/restaurantData/restaurantDataSlice";
import { useRouter } from "next/navigation";

export default function RestaurantSearch() {
  const { allRestaurants, error, status } = useSelector(
    (state: RootState) => state.restaurantData
  );
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>();
  const router = useRouter();

  const filteredRestaurants =
    allRestaurants &&
    allRestaurants.filter((restaurant: RestaurantList) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   dispatch(getAllRestaurants());
  // }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6">
          <div className=" mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Search Restaurant
            </h1>
            <p className="text-sm text-black/40">
              Enter your restaurant's name in the search bar below.
              Select the restaurant and send access request to the Admin.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 border-b-2 border-black rounded outline-none focus:ring-0 focus:border-b-2 focus:border-red transition-colors duration-200"
            />

            {/* {status === "loading" ? (
              <p className="text-center text-gray-600">
                Loading restaurants...
              </p>
            ) : (
              searchTerm && (
                <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                  {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                      <li
                        key={restaurant._id}
                        className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        <button
                          className="w-full flex items-start justify-between"
                          onClick={() => setSelectedRestaurant(restaurant._id)}
                        >
                          {restaurant.name}
                          {selectedRestaurant === restaurant._id && (
                            <CircleCheck className="text-green" />
                          )}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-center text-gray-600">
                      No matching restaurants found
                    </li>
                  )}
                </ul>
              )
            )} */}
            <Button
              onClick={() => router.replace("/dashboard")}
              text="Request Authorization"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

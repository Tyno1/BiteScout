"use client";

import { createRestaurantData } from "@/state/restaurantData/restaurantDataSlice";
import { AppDispatch, RootState } from "@/state/store";
import { RestaurantDataState } from "@/types/restaurantData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding() {
  const {
    restaurantData: restaurant,
    error,
    status,
  } = useSelector((state: RootState) => state.restaurantData);
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const router = useRouter();

  const defaultRestaurantData: RestaurantDataState = {
    name: "",
    logo: "",
    description: "",
    cuisine: [],
    priceRange: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    businessHours: [
      {
        day: "",
        open: "",
        close: "",
        closed: false,
      },
    ],
    features: [],
    gallery: [],
    meta: {},
    owner: false,
    ownerId: "",
  };
  const [restaurantData, setRestaurantData] = useState(defaultRestaurantData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission
    if (restaurantData.owner && session && session?.data?.user?.id) {
      const newRestaurantData = {
        ...restaurantData,
        ownerId: session.data.user.id,
      };
      dispatch(createRestaurantData(newRestaurantData));
    } else {
      router.push("/onboarding/restaurant-search");
    }
  };

  useEffect(() => {
    // get all resta
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Restaurant Onboarding
              </h1>
              <p className="text-gray-500">
                Please tell us about your role and restaurant
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Are you a restaurant owner?
                </h2>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setRestaurantData((prev) => ({
                        ...prev,
                        owner: true,
                        employee: false,
                      }))
                    }
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      restaurantData.owner
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRestaurantData((prev) => ({
                        ...prev,
                        owner: false,
                      }))
                    }
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      !restaurantData.owner
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Are you an employee?
                </h2>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setRestaurantData((prev) => ({
                        ...prev,
                        employee: true,
                        owner: false,
                      }))
                    }
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      restaurantData.employee
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRestaurantData((prev) => ({
                        ...prev,
                        employee: false,
                      }))
                    }
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      !restaurantData.employee
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Restaurant Name Input */}
            {restaurantData.owner && (
              <div className="space-y-3">
                <label
                  className="text-lg font-semibold text-gray-700 block"
                  htmlFor="restaurant-name"
                >
                  Restaurant Name
                </label>
                <input
                  value={restaurantData.name}
                  name="name"
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  type="text"
                  id="restaurant-name"
                  placeholder="Enter your restaurant name"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

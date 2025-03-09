import Button from "@/components/atoms/buttons/Button";
import { UserContext } from "@/providers/userContext";
import { createRestaurantData } from "@/state/restaurantData/restaurantDataSlice";
import { AppDispatch, RootState } from "@/state/store";
import { RestaurantDataState } from "@/types/restaurantData";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Roles = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { userData } = useContext(UserContext);
  const {
    restaurantData: restaurant,
    error,
    status,
  } = useSelector((state: RootState) => state.restaurantData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const defaultRestaurantData: RestaurantDataState = {
    name: "",
    logo: "ttt",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    console.log(userData);

    if (restaurantData.owner && userData?._id) {
      // Ensure all required fields are present
      const businessHours = restaurantData.businessHours.map((hour) => ({
        day: hour.day || "Monday", // Default value
        open: hour.open || "09:00", // Default value
        close: hour.close || "17:00", // Default value
        closed: hour.closed || false,
      }));

      const newRestaurantData: RestaurantDataState = {
        ...restaurantData,
        ownerId: userData._id,
        businessHours: businessHours, // Required with proper structure
        priceRange: restaurantData.priceRange || "$",
      };

      console.log("Submitting complete restaurant data:", newRestaurantData);

      try {        
        const resultAction = await dispatch(
          createRestaurantData({ restaurantData: newRestaurantData, token })
        );
        console.log(resultAction);

        if (createRestaurantData.fulfilled.match(resultAction)) {
          console.log("Restaurant created successfully:", resultAction.payload);
          navigate("/dashboard");
        } else {
          console.error("Failed to create restaurant:", resultAction.error);
        }
      } catch (error) {
        console.error("Error creating restaurant:", error);
      }
    } else {
      navigate("/onboarding/restaurant-search");
    }
  };

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
              <h1 className="text-3xl text-gray-900">
                Welcome <span className="font-bold">{userData.name}</span>
              </h1>
              <p className="text-gray-500">
                Please tell us about your role and restaurant
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select your role:
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setRestaurantData((prev) => ({ ...prev, owner: true }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    restaurantData.owner
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Restaurant Owner
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRestaurantData((prev) => ({ ...prev, owner: false }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    !restaurantData.owner
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Employee
                </button>
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
                  className={`${
                    error && restaurantData.name === "" && "border-orange"
                  } w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors `}
                  type="text"
                  id="restaurant-name"
                  placeholder="Enter your restaurant name"
                />
                {error && restaurantData.name === "" && (
                  <div className="space-y-2">
                    <p className="text-sm text-orange">
                      You must enter a restaurant name
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}

            <Button
              variant="solid"
              type="submit"
              text={
                restaurantData.owner
                  ? `Create Restaurant Profile`
                  : `Find Your Restaurant`
              }
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Roles;

"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  createRestaurantData,
  getRestaurantDataByOwnerId,
} from "@/state/restaurantData/restaurantDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { redirect, useRouter } from "next/navigation";

export default function AuthLoader() {
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    restaurantData: restaurant,
    error,
    status,
  } = useSelector((state: RootState) => state.restaurantData);

  useEffect(() => {
    const handleRestaurantData = async () => {
      // Check if the user is logged in
      if (
        session?.data?.user?.id &&
        session.data?.user.restaurantCount &&
        session.data?.user?.restaurantCount >= 1
      ) {
        // Fetch the restaurant data for the current user
        dispatch(getRestaurantDataByOwnerId(session.data.user.id));
        if (status === "succeeded" && restaurant) {
          router.push("/dashboard");
        }
      } else{
        router.push("/onboarding/roles");
      }
    };

    handleRestaurantData();
  }, [
    session?.data?.user?.id,
    restaurant,
    session.data?.user?.restaurantCount,
  ]);

 
  return <div>Loading</div>;
}

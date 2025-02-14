import dbConnect from "@/utils/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import restaurantData from "../../models/RestaurantData";

const handleError = (error: any, message: string, status = 500) => {
  return NextResponse.json({ error: `${error} ${message}` }, { status });
};

// Get RestaurantData by Owner Id
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }

    const restaurant = await restaurantData.findOne({ ownerId: id });
    if (!restaurant) {
      return NextResponse.json({ error: "User Is not a Restaurant Owner" }, { status: 404 });
    }
    return NextResponse.json(restaurant);
  } catch (error: any) {
    return handleError(error, error?.message);
  }
}

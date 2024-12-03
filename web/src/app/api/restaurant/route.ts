import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import restaurantData from "@/models/restaurantData";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const restaurant = await restaurantData;

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant data not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(restaurant);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

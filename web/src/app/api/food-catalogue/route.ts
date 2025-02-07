import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import foodCatalogue from "@/app/api/models/foodCatalogue";


// get food catalogue by restaurantId
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const restaurantId = await request.nextUrl
    const foodCatalogueData = await foodCatalogue.findById(request.)
    if (!foodCatalogueData) {
      return NextResponse.json(
        { error: "Food catalogue data not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(foodCatalogueData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

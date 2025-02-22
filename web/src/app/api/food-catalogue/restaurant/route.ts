import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import FoodCatalogue from "../../models/FoodCatalogue";


// get food catalogue by restaurant Id
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const restaurantId = await request.nextUrl.searchParams.get("id");

    const foodCatalogueData = await FoodCatalogue.find({
      restaurant: restaurantId,
    })
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");

    if (!foodCatalogueData) {
      return NextResponse.json(
        { error: "Food catalogue data not found" },
        { status: 404 }
      );
    }
    console.log(foodCatalogueData);

    return NextResponse.json(foodCatalogueData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

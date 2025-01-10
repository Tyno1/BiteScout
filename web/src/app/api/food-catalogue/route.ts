import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import foodCatalogue from "@/models/foodCatalogue";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // const id  = await request
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

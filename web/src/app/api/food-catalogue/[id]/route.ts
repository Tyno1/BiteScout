import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import FoodCatalogue from "../../models/FoodCatalogue";

interface Params {
  id: string;
}
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const id = await params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Missing Food Catalogue Id" },
        { status: 400 }
      );
    }
    await dbConnect();

    const result = await FoodCatalogue.findById(id)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");

    if (!result) {
      return NextResponse.json(
        { error: "Food Catalogue not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "An error occurred while fetching the Food Catalogue" },
      { status: 500 }
    );
  }
}

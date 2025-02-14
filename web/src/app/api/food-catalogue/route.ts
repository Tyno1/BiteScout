import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import foodCatalogue from "@/app/api/models/FoodCatalogue";
import allergen from "../models/Allergen";

// Get food catalogue by restaurantId
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const restaurantId = await request.nextUrl.searchParams.get("id");

    const foodCatalogueData = await foodCatalogue
      .find({
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

// Create new food catalogue item
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const newFoodItem = new foodCatalogue(body);
    const savedFoodItem = await newFoodItem.save();

    return NextResponse.json(savedFoodItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update food catalogue item
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const itemId = request.nextUrl.searchParams.get("id");
    const body = await request.json();

    const updatedFoodItem = await foodCatalogue.findByIdAndUpdate(
      itemId,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedFoodItem) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFoodItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete food catalogue item
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const itemId = request.nextUrl.searchParams.get("id");

    const deletedFoodItem = await foodCatalogue.findByIdAndDelete(itemId);

    if (!deletedFoodItem) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Food item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

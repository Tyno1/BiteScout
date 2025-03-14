import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import allergen from "../models/Allergen";
import FoodCatalogue from "@/app/api/models/FoodCatalogue";


// Create new food catalogue item
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const newFoodItem = new FoodCatalogue(body);
    const savedFoodItem = await newFoodItem.save();
    console.log(savedFoodItem);

    const populatedFoodItem = await FoodCatalogue.findById(savedFoodItem._id)
      .populate("course")
      .populate("cuisineType")
      .populate("allergens");
    // Assuming you want to include the restaurant name

    if (!populatedFoodItem) {
      return NextResponse.json(
        { error: "Failed to retrieve the created food item" },
        { status: 500 }
      );
    }

    return NextResponse.json(populatedFoodItem, { status: 201 });
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

    const updatedFoodItem = await FoodCatalogue.findByIdAndUpdate(
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

    const deletedFoodItem = await FoodCatalogue.findByIdAndDelete(itemId);

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

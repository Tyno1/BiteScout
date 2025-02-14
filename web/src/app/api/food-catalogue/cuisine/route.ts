import { type NextRequest, NextResponse } from "next/server";
import CuisineType from "@/app/api/models/CuisineType";
import dbConnect from "@/utils/db";

// get all cusisine Types by restaurant Id
export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const cuisineTypes = await CuisineType.find();
    return NextResponse.json(cuisineTypes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cuisine types" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const newCuisineType = await CuisineType.create(body);
    return NextResponse.json(newCuisineType, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create cuisine type" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedCuisineType = await CuisineType.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCuisineType) {
      return NextResponse.json(
        { error: "Cuisine type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCuisineType);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cuisine type" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedCuisineType = await CuisineType.findByIdAndDelete(id);

    if (!deletedCuisineType) {
      return NextResponse.json(
        { error: "Cuisine type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Cuisine type deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete cuisine type" },
      { status: 500 }
    );
  }
}

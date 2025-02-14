import { NextRequest, NextResponse } from "next/server";
import Allergen from "@/app/api/models/Allergen";
import dbConnect from "@/utils/db";


// GET all allergens
export async function GET() {
  await dbConnect();
  try {
    const allergens = await Allergen.find({});
    return NextResponse.json(allergens);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch allergens" },
      { status: 500 }
    );
  }
}

// POST a new allergen
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const allergen = await Allergen.create(body);
    return NextResponse.json(allergen, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Allergen name must be unique" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create allergen" },
      { status: 500 }
    );
  }
}

// PUT (update) an allergen
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedAllergen = await Allergen.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAllergen) {
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAllergen);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update allergen" },
      { status: 500 }
    );
  }
}

// DELETE an allergen
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Allergen ID is required" },
        { status: 400 }
      );
    }

    const deletedAllergen = await Allergen.findByIdAndDelete(id);

    if (!deletedAllergen) {
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Allergen deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete allergen" },
      { status: 500 }
    );
  }
}

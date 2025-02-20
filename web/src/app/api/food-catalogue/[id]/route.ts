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

    const result = await FoodCatalogue.findById(id);

    return NextResponse.json(result, { status: 200 });
  } catch {}
}

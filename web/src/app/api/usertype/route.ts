import dbConnect from "@/utils/db";
import { type NextRequest, NextResponse } from "next/server";
import UserType from "@/app/api/models/UserType";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { name, level, description } = body;

    // Convert level to number if it's a string
    const levelNumber =
      typeof level === "string" ? Number.parseInt(level, 10) : level;

    if (isNaN(levelNumber)) {
      return NextResponse.json(
        { error: "Level must be a valid number" },
        { status: 400 }
      );
    }
    if (!name || !description) {
      return NextResponse.json(
        { error: "Missing name or description" },
        { status: 400 }
      );
    }
    await dbConnect();

    const existingUsertype = await UserType.findOne({ level: levelNumber });
    if (existingUsertype) {
      return NextResponse.json(
        { error: "User type already exists" },
        { status: 409 }
      );
    }

    const newUsertype = new UserType({
      name,
      level: levelNumber,
      description,
    });
    await newUsertype.save();

    return NextResponse.json(newUsertype, { status: 201 });
  } catch (error: unknown) {
    console.error("Error in POST /api/usertype:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const usertypes = await UserType.find();
    return NextResponse.json(usertypes, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET /api/usertype:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

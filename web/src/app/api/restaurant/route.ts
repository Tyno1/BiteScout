import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import restaurantData from "@/models/restaurantData";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const restaurant = await (restaurantData as any).find();

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant data not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(restaurant);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        {
          status: 400,
        }
      );
    }
    console.log(body);
    const newRestaurant = await (restaurantData as any).create(body);
    if (!newRestaurant) {
      return NextResponse.json(
        { error: "could not create" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `${error} Failed to Create Restaurant Data` },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "No id provided" },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();
    const updatedRestaurant = await (restaurantData as any).findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedRestaurant) {
      return NextResponse.json(
        { error: "Restaurant data not updated" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to edit Restaurant Data" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "No id provided" },
        {
          status: 400,
        }
      );
    }

    const deletedRestaurant = await (restaurantData as any).findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return NextResponse.json(
        { error: "Restaurant data not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(deletedRestaurant);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Restaurant Data" },
      {
        status: 500,
      }
    );
  }
}

import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import restaurantData from "@/app/api/models/RestaurantData";

// Helper function to handle errors
const handleError = (error: any, message: string, status = 500) => {
  return NextResponse.json({ error: `${error} ${message}` }, { status });
};

// Helper function to validate request ID
const validateId = (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    throw new Error("No id provided");
  }
  return id;
};

// Create new restaurant
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const newRestaurant = await (restaurantData as any).create(body);
    console.log(newRestaurant);

    if (!newRestaurant) {
      return NextResponse.json(
        { error: "Could not create restaurant" },
        { status: 400 }
      );
    }

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to Create Restaurant Data");
  }
}

// Get single restaurant by ID or get all restaurants
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");

    // If ID is provided, return single restaurant
    if (id) {
      const restaurant = await (restaurantData as any).findById(id);

      if (!restaurant) {
        return NextResponse.json(
          { error: "Restaurant not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(restaurant);
    }

    // If no ID is provided, return all restaurants
    const allRestaurants = await (restaurantData as any).find();

    if (!allRestaurants || allRestaurants.length === 0) {
      return NextResponse.json(
        { error: "No restaurants found" },
        { status: 404 }
      );
    }
    const restaurantList = allRestaurants.map((restaurant: any) => ({
      _id: restaurant._id,
      name: restaurant.name,
      ownerId: restaurant.ownerId,
    }));
    return NextResponse.json(restaurantList);
  } catch (error: any) {
    return handleError(error, error.message);
  }
}

// Update restaurant data
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const id = validateId(request);
    const body = await request.json();

    const updatedRestaurant = await (restaurantData as any).findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedRestaurant) {
      return NextResponse.json(
        { error: "Restaurant data not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    return handleError(error, "Failed to edit Restaurant Data");
  }
}

// Delete restaurant data
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const id = validateId(request);

    const deletedRestaurant = await (restaurantData as any).findByIdAndDelete(
      id
    );

    if (!deletedRestaurant) {
      return NextResponse.json(
        { error: "Restaurant data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedRestaurant);
  } catch (error) {
    return handleError(error, "Failed to delete Restaurant Data");
  }
}

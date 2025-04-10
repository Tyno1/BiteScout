import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import UserType from "../models/UserType";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    const { firstName, lastName, email, password } = body;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Missing Credentials" },
        { status: 400 }
      );
    }
    const userExixts = await User.findOne({ email });

    if (userExixts) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const userType = await UserType.findOne({ name: "user" });
    if (!userType) {
      return NextResponse.json(
        { message: "User type not found" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      userType: userType._id,
      loginMethod: "credentials",
    });

    if (!user) {
      return NextResponse.json(
        { message: "User creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

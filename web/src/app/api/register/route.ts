import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import userType from "../models/userType";

export const POST = async (request: NextRequest) => {
  const { firstName, lastName, email, password } = await request.json();
  try {
    await dbConnect();
    
    // get default userType - lowest priviledge - highest number
    const lowestPrivilegeType = await userType
      .findOne()
      .sort({ level: -1 })
      .limit(1);

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      userType: lowestPrivilegeType._id,
    });
    await user.save();

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};

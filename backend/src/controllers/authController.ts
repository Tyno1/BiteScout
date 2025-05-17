import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import UserType from "../models/UserType.js";
import {
  generateAccessToken,
  generateRefreshToken,
  MyJWTPayload,
} from "../helpers/index.js";
import jwt from "jsonwebtoken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if all required fields are provided
    if (!email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
      expiresIn: Date.now() + 3600 * 1000, // expiresIn is a timestamp in milliseconds
    });
    return;
  } catch (error: any) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Get the user type
    const userType = await UserType.findOne({ name: "guest" });

    if (!userType) {
      res.status(400).json({ message: "User type not found" });
      return;
    }
    // Create a new user
    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      userType,
    });

    const userWithoutPass = {
      name: newUser.name,
      email: newUser.email,
      userType: newUser.userType
    };

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPass,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token not found" });
    return;
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as MyJWTPayload;

    const user = await User.findById(decoded?.userId);

    if (!user) {
      res.status(400).json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "Refresh token successful",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: Date.now() + 3600 * 1000, // expiresIn is a timestamp in milliseconds
    });
    return;
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token request" });
    console.log("SOMETHING WENT WRONG", error);

    return;
  }
};

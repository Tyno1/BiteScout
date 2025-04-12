import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserType from "../models/UserType.js";
import { generateAccessToken } from "../helpers/index.js";

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

    const token = generateAccessToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
      user,
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
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Get the user type
    const userType = await UserType.findOne({ name: "user" });

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

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

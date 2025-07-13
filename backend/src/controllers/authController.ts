import type { LoginPostRequest, LoginPostResponse } from "@shared/types/auth/login";
import type { RefreshPostRequest, RefreshPostResponse } from "@shared/types/auth/refresh";
import type {
  RegisterPostRequest,
  RegisterPostResponse,
} from "@shared/types/auth/register";
import type { ApiError } from "@shared/types/common/errors.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	type MyJWTPayload,
	generateAccessToken,
	generateRefreshToken,
} from "../helpers/index.js";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import User from "../models/User.js";

type LoginApiResponse = LoginPostResponse | ApiError;
type RegisterApiResponse = RegisterPostResponse | ApiError;
type RefreshApiResponse = RefreshPostResponse | ApiError;

export const login = async (
	req: Request<Record<string, never>, unknown, LoginPostRequest>,
	res: Response<LoginApiResponse>,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);

		// Check if all required fields are provided
		if (!email || !password) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Missing required fields"),
			);
		}

		// Check if the user exists
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return next(createError(ErrorCodes.BAD_REQUEST, "User not found"));
		}

		// Check if the password is correct
		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid credentials"));
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
	} catch (error) {
		return next(error);
	}
};

export const register = async (
	req: Request<Record<string, never>, unknown, RegisterPostRequest>,
	res: Response<RegisterApiResponse>,
	next: NextFunction,
) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Check if all required fields are provided
		if (!firstName || !lastName || !email || !password) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Missing required fields"),
			);
		}

		// Check if the user already exists
		const userExists = await User.findOne({ email });

		if (userExists) {
			return next(createError(ErrorCodes.CONFLICT, "User already exists"));
		}

		// Create a new user
		const newUser = await User.create({
			name: `${firstName} ${lastName}`,
			email,
			password,
			userType: "guest",
		});

		const userWithoutPass = {
			name: newUser.name,
			email: newUser.email,
			userType: newUser.userType,
		};

		res.status(201).json({
			message: "User created successfully",
			user: userWithoutPass,
		});
	} catch (error) {
		return next(error);
	}
};

export const refresh = async (
	req: Request<Record<string, never>, unknown, RefreshPostRequest>,
	res: Response<RefreshApiResponse>,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return next(
				createError(ErrorCodes.BAD_REQUEST, "Refresh token not found"),
			);
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET as string,
		) as MyJWTPayload;

		const user = await User.findById(decoded?.userId);

		if (!user) {
			return next(createError(ErrorCodes.BAD_REQUEST, "Invalid refresh token"));
		}

		const newAccessToken = generateAccessToken(user);
		const newRefreshToken = generateRefreshToken(user);

		res.status(200).json({
			message: "Refresh token successful",
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			expiresIn: Date.now() + 3600 * 1000, // expiresIn is a timestamp in milliseconds
		});
	} catch (error) {
		return next(
			createError(ErrorCodes.UNAUTHORIZED, "Invalid refresh token request"),
		);
	}
};

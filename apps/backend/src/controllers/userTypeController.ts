import type { ApiError } from "shared/types/common/errors";
import type { UserTypeGetByNameRequest, UserTypeGetByNameResponse } from "shared/types/index";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import UserType from "../models/UserType.js";

type UserTypeApiResponse = UserTypeGetByNameResponse | ApiError;
export const getUserTypeByName = async (
  req: Request<UserTypeGetByNameRequest>,
  res: Response<UserTypeApiResponse>,
  next: NextFunction
) => {
  try {
    const { userType } = req.params;

    if (!userType) {
	  return next(createError(ErrorCodes.BAD_REQUEST, "UserType parameter is required"))
    }
    const response = await UserType.findOne({ name: userType });

    if (!response) {
      return next(createError(ErrorCodes.NOT_FOUND, "User Type not found"));
    }

    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

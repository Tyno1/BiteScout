import { NextFunction, Request, Response } from "express";
import UserType from "../models/UserType.js";

export const getUserTypeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userTypeId } = req.params;

    if (!userTypeId) {
      return res.status(404).json({ error: "UserType Id not Provided" });
    }
    const response = await (UserType as any).findById(userTypeId);

    if (!response) {
      return res.status(404).json({ error: "User Type not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

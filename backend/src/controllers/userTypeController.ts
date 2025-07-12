import type { NextFunction, Request, Response } from "express";
import UserType from "../models/UserType.js";

export const getUserTypeByName = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userType } = req.params;

		if (!userType) {
			return res.status(404).json({ error: "UserType not Provided" });
		}
		const response = await (UserType as any).findOne({ name: userType });

		if (!response) {
			return res.status(404).json({ error: "User Type not found" });
		}

		res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
};

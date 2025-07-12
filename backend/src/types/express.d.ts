import type { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				email: string;
				userType: string;
				iat: number;
				exp: number;
			};
		}
	}
}

import type { NextFunction, Request, Response } from "express";
import {
	getRecentNotifications,
	markAllAsRead as markAllNotificationsAsRead,
	markAsRead,
} from "../services/notificationService.js";

export const getNotifications = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;

		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const limit = Number.parseInt(req.query.limit as string) || 20;
		const offset = Number.parseInt(req.query.offset as string) || 0;

		const notifications = await getRecentNotifications(userId, limit, offset);

		res.status(200).json(notifications);
	} catch (error) {
		next(error);
	}
};

export const markNotificationAsRead = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const { notificationId } = req.params;

		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const updatedNotification = await markAsRead(notificationId, userId);

		if (!updatedNotification) {
			res.status(404).json({ error: "Notification not found" });
			return;
		}

		res.status(200).json(updatedNotification);
	} catch (error) {
		next(error);
	}
};

export const markAllAsReadController = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { userId } = req.params;

		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const updatedCount = await markAllNotificationsAsRead(userId);

		res.status(200).json({ 
			message: "All notifications marked as read",
			updatedCount: updatedCount
		});
	} catch (error) {
		next(error);
	}
};

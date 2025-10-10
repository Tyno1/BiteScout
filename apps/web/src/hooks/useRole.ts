import type { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import type { AccessRoles } from "shared/types/api/schemas";
import { getRoleFromToken } from "@/utils/getRoleFromSession";
import { useGetSession } from "./useGetSession";

type ReturnType = {
	isLoading: boolean;
	session: Session | null;
	error: string | null;
	userRole: AccessRoles | null;
	refreshRole: () => Promise<void>;
};

// create hook to get user role and check if user has access to a specific role
export const useRole = (): ReturnType => {
	const session = useGetSession();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<AccessRoles | null>(null);

	const fetchUserRole = useCallback(async () => {
		if (!session) return;

		setIsLoading(true);
		setError(null);

		try {
			if (!session?.user?.accessToken)
				throw new Error("User session and token not found");

			const role = getRoleFromToken(session?.user?.accessToken);

			if (!role) {
				throw new Error("Failed to fetch user role");
			}

			setUserRole(role);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setIsLoading(false);
		}
	}, [session]);

	useEffect(() => {
		if (session) {
			fetchUserRole();
		}
	}, [session, fetchUserRole]);

	return {
		isLoading,
		session,
		error,
		userRole,
		refreshRole: fetchUserRole,
	};
};

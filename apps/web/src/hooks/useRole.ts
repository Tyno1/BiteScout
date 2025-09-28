import type { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import type { AccessRoles } from "shared/types/api/schemas";
import { getCurrentSession } from "@/app/actions/getSessionAction";
import { getRoleFromToken } from "@/utils/getRoleFromSession";

type ReturnType = {
  isLoading: boolean;
  session: Session | null;
  error: string | null;
  userRole: AccessRoles | null;
  refreshRole: () => Promise<void>;
};

// create hook to get user role and check if user has access to a specific role
export const useRole = (): ReturnType => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<AccessRoles | null>(null);

  const fetchUserRole = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCurrentSession();

      if (!response?.user?.accessToken) throw new Error("User session and token not found");

      setSession(response);

      const role = getRoleFromToken(response?.user?.accessToken);

      if (!role) {
        throw new Error("Failed to fetch user role");
      }

      setUserRole(role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  return {
    isLoading,
    session,
    error,
    userRole,
    refreshRole: fetchUserRole,
  };
};

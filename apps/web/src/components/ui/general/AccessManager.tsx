import { useRole } from "@/hooks/useRole";
import type React from "react";
import type { AccessRoles } from "shared/types/api/schemas";

type AccessManagerProps = {
  children: React.ReactNode;
  roles: AccessRoles[];
};

export function AccessManager({ children, roles }: AccessManagerProps) {
  const { isLoading, userRole } = useRole();

  return !isLoading && userRole && roles.includes(userRole) ? <>{children}</> : null;
}

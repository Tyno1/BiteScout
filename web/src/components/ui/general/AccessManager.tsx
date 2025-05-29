import { useRole } from "@/app/hooks/useRole";
import { AccessRoles } from "@/types";
import React from "react";

type AccessManagerProps = {
  children: React.ReactNode;
  roles: AccessRoles[];
};

export function AccessManager({ children, roles }: AccessManagerProps) {
  const { isLoading, userRole } = useRole();  

  return !isLoading && userRole && roles.includes(userRole)
    ? <>{ children }</>
    : null;
}

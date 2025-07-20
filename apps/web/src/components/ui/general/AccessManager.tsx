import { useRole } from "@/app/hooks/useRole";
import type { AccessRoles } from "shared/types/api/enums";
import type React from "react";

type AccessManagerProps = {
	children: React.ReactNode;
	roles: AccessRoles[];
};

export function AccessManager({ children, roles }: AccessManagerProps) {
	const { isLoading, userRole } = useRole();

	return !isLoading && userRole && roles.includes(userRole) ? (
		<>{children}</>
	) : null;
}

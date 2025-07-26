import { type JwtPayload, jwtDecode } from "jwt-decode";
import type { AccessRoles } from "shared/types/api/schemas";

type CustomJwtPayload = JwtPayload & {
  userType: AccessRoles;
};

export function getRoleFromToken(sessionToken: string): AccessRoles {
  const token = jwtDecode<CustomJwtPayload>(sessionToken);
  const role = token?.userType;
  return role;
}

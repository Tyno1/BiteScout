import type { AccessRoles } from "@shared/types/api/enums";
import { type JwtPayload, jwtDecode } from "jwt-decode";

type CustomJwtPayload = JwtPayload & {
  userType: AccessRoles;
};

export function getRoleFromToken(sessionToken: string): AccessRoles {
  const token = jwtDecode<CustomJwtPayload>(sessionToken);
  const role = token?.userType;
  return role;
}

import { AccessRoles } from "@/types";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type CustomJwtPayload = JwtPayload & {
  userType: AccessRoles;
};

export function getRoleFromToken(sessionToken: string): AccessRoles {
  const token = jwtDecode<CustomJwtPayload>(sessionToken);
  const role = token?.userType;
  return role;
}

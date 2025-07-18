// AccessRoleEnum and AccessStatusEnum moved from schemas.ts
import type { components } from "./schemas";

export type AccessRoles = components["schemas"]["RestaurantAccess"]["role"];
export type AccessStatus = components["schemas"]["RestaurantAccess"]["status"];

export const AccessRoleEnum: Record<string, AccessRoles> = {
  Guest: "guest" as const,
  User: "user" as const,
  Moderator: "moderator" as const,
  Admin: "admin" as const,
  Root: "root" as const,
} as const;

export const AccessStatusEnum: Record<string, AccessStatus> = {
  Pending: "pending" as const,
  Approved: "approved" as const,
  Suspended: "suspended" as const,
  Innactive: "innactive" as const,
} as const; 
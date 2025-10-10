import type { AccessRoles } from "shared/types/api/schemas";
import { AccessRoleEnumValues } from "shared/types/api/schemas";

import { Routes } from "./routes";

export const Permissions: Record<string, AccessRoles[]> = {
  [Routes.dashboard.teamManagement]: [AccessRoleEnumValues.Admin, AccessRoleEnumValues.Root],
  // general routes
  [Routes.dashboard.base]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.restaurantProfile]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.foodCatalogue]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.userManagement]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.notifications]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.analytics]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.reviews]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.aiAudio]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
  [Routes.dashboard.customerInsights]: [
    AccessRoleEnumValues.Admin,
    AccessRoleEnumValues.Root,
    AccessRoleEnumValues.Moderator,
  ],
};

import * as enums from "@shared/types/api/enums";
const { AccessRoleEnum } = enums;
import type { AccessRoles } from "@shared/types/api/enums";

import { Routes } from "./routes";

export const Permissions: Record<string, AccessRoles[]> = {
  [Routes.dashboard.teamManagement]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
  ],
  // general routes
  [Routes.dashboard.base]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.restaurantProfile]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.foodCatalogue]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.userManagement]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.notifications]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.analytics]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.reviews]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.aiAudio]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
  [Routes.dashboard.customerInsights]: [
    AccessRoleEnum.Admin,
    AccessRoleEnum.Root,
    AccessRoleEnum.Moderator,
  ],
};

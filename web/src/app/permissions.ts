import { AccessRoles, Roles } from "@/types";
import { Routes } from "./routes";

export const Permissions: Record<string, AccessRoles[]> = {
  [Routes.dashboard.teamManagement]: [Roles.ADMIN, Roles.ROOT],
  // general routes
  [Routes.dashboard.base]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.restaurantProfile]: [
    Roles.ADMIN,
    Roles.ROOT,
    Roles.MODERATOR,
  ],
  [Routes.dashboard.foodCatalogue]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.userManagement]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.notifications]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.analytics]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.reviews]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.aiAudio]: [Roles.ADMIN, Roles.ROOT, Roles.MODERATOR],
  [Routes.dashboard.customerInsights]: [
    Roles.ADMIN,
    Roles.ROOT,
    Roles.MODERATOR,
  ],
};

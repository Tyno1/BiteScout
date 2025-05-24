import { AccessRoles } from "@/types";

type ReturnType = {
  hasAccess: () => boolean;
  isOwner: () => boolean;
  isAdmin: () => boolean;
  role: () => AccessRoles;
};

// create hook to get user role and check if user has access to a specific role
export const useAccessRole = () => {};

// Re-export types from the centralized enums file
export type { AccessRoles } from './api/enums';
export { AccessRoleEnum, AccessStatusEnum } from './api/enums';

// For backward compatibility, re-export the enum values with different names
export const AccessStatusValues = {
  Pending: 'pending' as const,
  Approved: 'approved' as const,
  Suspended: 'suspended' as const,
  Innactive: 'innactive' as const,
} as const;

export const AccessRoleValues = {
  Guest: 'guest' as const,
  User: 'user' as const,
  Moderator: 'moderator' as const,
  Admin: 'admin' as const,
  Root: 'root' as const,
} as const;

// Type aliases for backward compatibility
export type AccessStatusValuesType = typeof AccessStatusValues[keyof typeof AccessStatusValues];
export type AccessRoleValuesType = typeof AccessRoleValues[keyof typeof AccessRoleValues]; 
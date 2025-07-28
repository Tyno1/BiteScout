// Re-export types from the centralized schemas file
export type { AccessRoles } from './api/schemas';
export { AccessRoleEnum, AccessStatusEnum } from './api/schemas';

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
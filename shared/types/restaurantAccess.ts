import type { components } from './api';

// Extract the union types from generated schemas
export type AccessStatusEnum = components['schemas']['RestaurantAccess']['status'];
export type AccessRoleEnum = components['schemas']['RestaurantAccess']['role'];
export type UserTypeEnum = components['schemas']['UserType']['name'];

// Create enum objects for runtime usage
export const AccessStatus = {
  Pending: 'pending' as const,
  Approved: 'approved' as const,
  Suspended: 'suspended' as const,
  Innactive: 'innactive' as const,
} as const;

export const AccessRole = {
  Guest: 'guest' as const,
  User: 'user' as const,
  Moderator: 'moderator' as const,
  Admin: 'admin' as const,
  Root: 'root' as const,
} as const;

export const UserType = {
  Guest: 'guest' as const,
  User: 'user' as const,
  Moderator: 'moderator' as const,
  Admin: 'admin' as const,
  Root: 'root' as const,
} as const;

// Type assertions to ensure the enum objects match the generated types
export type AccessStatusValues = typeof AccessStatus[keyof typeof AccessStatus];
export type AccessRoleValues = typeof AccessRole[keyof typeof AccessRole];
export type UserTypeValues = typeof UserType[keyof typeof UserType];

// Verify that our enum values match the generated types
type _AssertAccessStatus = AccessStatusValues extends AccessStatusEnum ? true : never;
type _AssertAccessRole = AccessRoleValues extends AccessRoleEnum ? true : never;
type _AssertUserType = UserTypeValues extends UserTypeEnum ? true : never; 
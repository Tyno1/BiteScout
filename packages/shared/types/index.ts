// Main Types Index - All organized API types

// Generated OpenAPI types
export type { paths, components } from './api';

// Organized API types by domain
export * from './auth';
export * from './user';
export * from './userType';
export * from './restaurant';
export * from './access';
export * from './notifications';
export * from './allergens';
export * from './courses';
export * from './cuisines';
export * from './media';
export * from './post';
export * from './food-catalogue';

// Common types
export * from './common';

// API schemas (avoid conflicts by not re-exporting)
export type { 
  User, 
  Restaurant, 
  FoodCatalogue, 
  Price, 
  BusinessHour,
  Allergen,
  Course,
  Cuisine,
  UserType,
  Media,
  ErrorResponse,
  Post
} from './api/schemas';

// Access enums moved from schemas.ts
import type { components } from './api';

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
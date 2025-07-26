// Export all schema types from the generated API types
import type { components } from "../api";

// Export all schema types
export type DeliveryLink = components["schemas"]["DeliveryLink"];
export type Restaurant = components["schemas"]["Restaurant"];
export type RestaurantFeature = components["schemas"]["RestaurantFeature"];
export type User = components["schemas"]["User"];
export type Allergen = components["schemas"]["Allergen"];
export type Course = components["schemas"]["Course"];
export type Cuisine = components["schemas"]["Cuisine"];
export type BusinessHour = components["schemas"]["BusinessHour"];
export type Media = components["schemas"]["Media"];
export type Notification = components["schemas"]["Notification"];
export type RestaurantAccess = components["schemas"]["RestaurantAccess"];
export type UserType = components["schemas"]["UserTypeInfo"];
export type FoodCatalogue = components["schemas"]["FoodCatalogue"];
export type Price = components["schemas"]["Price"];
export type Currency = components["schemas"]["Currency"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type Post = components["schemas"]["Post"];
// Re-export the components schemas for easier access
export type { components } from "../api";

// AccessRoleEnum and AccessStatusEnum moved from enums.ts
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

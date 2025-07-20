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
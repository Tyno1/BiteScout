// API Schema Types - Extracted from generated OpenAPI types
import type { components } from '../api';

// Export all schema types
export type User = components['schemas']['User'];
export type Restaurant = components['schemas']['Restaurant'];
export type RestaurantFeature = NonNullable<Restaurant["features"]>[number];
export type FoodCatalogue = components['schemas']['FoodCatalogue'];
export type Price = components['schemas']['Price'];
export type BusinessHour = components['schemas']['BusinessHour'];
export type Allergen = components['schemas']['Allergen'];
export type Course = components['schemas']['Course'];
export type Cuisine = components['schemas']['Cuisine'];
export type UserType = components['schemas']['UserType'];
export type Media = components['schemas']['Media'];
export type Notification = components['schemas']['Notification'];
export type RestaurantAccess = components['schemas']['RestaurantAccess'];
export type Currency = components['schemas']['Currency'];
export type ErrorResponse = components['schemas']['ErrorResponse']; 
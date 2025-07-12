// User profile and management types
import type { BaseEntity } from './common';

export interface UserProfile extends BaseEntity {
  name: string;
  email: string;
  userType: string;
  imageUrl?: string;
  phone?: string;
  address?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions?: string[];
  favoriteCuisines?: string[];
  notificationSettings?: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface UserStats {
  totalReviews: number;
  totalFavorites: number;
  memberSince: string;
} 
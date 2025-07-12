// Restaurant related types
import type { BaseEntity } from './common';

export interface Restaurant extends BaseEntity {
  name: string;
  ownerId: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  isOpen?: boolean;
  hours?: BusinessHours;
  images?: string[];
}

export interface BusinessHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface MenuItem extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  allergens?: string[];
}

export interface Review extends BaseEntity {
  userId: string;
  restaurantId: string;
  rating: number;
  comment?: string;
  images?: string[];
} 
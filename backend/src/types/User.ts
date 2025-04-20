export interface User {
  _id?: string;
  username?: string;
  phone?: string;
  name: string;
  email: string;
  hometown?: string;
  currentCity?: string;
  country?: string;
  picture?: string;
  address?: string;
  emailVerified: boolean;
  userType: string;
  locale?: string;
  lastLogin: Date;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  restaurantCount: number;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
}

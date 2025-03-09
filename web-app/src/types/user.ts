
export interface IUser {
  auth0Id: string;
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
  lastLogin?: Date;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Profile Types - Following Allergen Controller Pattern
// These types are manually defined since the OpenAPI spec has structural issues

// Request Types
export type GetUserProfileRequest = {
  userId: string;
};

export type UpdateUserProfileRequest = {
  name?: string;
  username?: string;
  phone?: string;
  bio?: string;
  dietaryPreferences?: string[];
  location?: {
    city?: string;
    country?: string;
  };
  imageUrl?: string;
  notificationSettings?: {
    likes?: boolean;
    follows?: boolean;
    restaurantUpdates?: boolean;
  };
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

// Response Types
export type GetUserProfileResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
    username?: string;
    userType: "guest" | "user" | "admin" | "moderator" | "root";
    phone?: string;
    bio?: string;
    dietaryPreferences?: string[];
    location?: {
      city?: string;
      country?: string;
    };
    imageUrl?: string;
    notificationSettings?: {
      likes?: boolean;
      follows?: boolean;
      restaurantUpdates?: boolean;
    };
    restaurantCount: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type UpdateUserProfileResponse = {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    username?: string;
    userType: "guest" | "user" | "admin" | "moderator" | "root";
    phone?: string;
    bio?: string;
    dietaryPreferences?: string[];
    location?: {
      city?: string;
      country?: string;
    };
    imageUrl?: string;
    notificationSettings?: {
      likes?: boolean;
      follows?: boolean;
      restaurantUpdates?: boolean;
    };
    restaurantCount: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type ChangePasswordResponse = {
  message: string;
};

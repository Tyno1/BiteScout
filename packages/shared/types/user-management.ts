// User Management Types - Following Allergen Controller Pattern
// These types are manually defined since the OpenAPI spec has structural issues

// Request Types
export type GetAllUsersRequest = {
  page?: number;
  limit?: number;
  search?: string;
  userType?: "guest" | "user" | "admin" | "moderator" | "root";
  status?: "pending" | "approved" | "suspended" | "innactive";
};

export type GetUserByIdRequest = {
  userId: string;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  username?: string;
  userType?: "guest" | "user" | "admin" | "moderator" | "root";
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

export type DeleteUserRequest = {
  userId: string;
};

export type GetUserStatsRequest = Record<string, never>;

// Response Types
export type GetAllUsersResponse = {
  users: Array<{
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
    restaurantAccess: number;
    activeRestaurants: number;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type GetUserByIdResponse = {
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
    restaurantAccess: number;
    activeRestaurants: number;
    restaurantAccessDetails: Array<{
      _id: string;
      userId: string;
      restaurantId: string;
      role: "guest" | "user" | "moderator" | "admin" | "root";
      status: "pending" | "approved" | "suspended" | "innactive";
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export type UpdateUserResponse = {
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

export type DeleteUserResponse = {
  message: string;
  deletedUser: {
    _id: string;
    name: string;
    email: string;
  };
};

export type GetUserStatsResponse = {
  totalUsers: number;
  newUsersThisMonth: number;
  userTypeBreakdown: Array<{
    _id: "guest" | "user" | "admin" | "moderator" | "root";
    count: number;
  }>;
  accessStatusBreakdown: Array<{
    _id: "pending" | "approved" | "suspended" | "innactive";
    count: number;
  }>;
};

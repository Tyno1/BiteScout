// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
}

// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  image: string;
  priceRange: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// API types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SearchFilters {
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  distance?: number;
  isOpen?: boolean;
}

export interface ReviewRequest {
  rating: number;
  comment: string;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Restaurant: { id: string };
  Profile: undefined;
}; 
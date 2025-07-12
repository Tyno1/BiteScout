// Authentication related types

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
  restaurantCount?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface JwtPayload {
  id: string;
  email: string;
  userType: string;
  iat: number;
  exp: number;
} 
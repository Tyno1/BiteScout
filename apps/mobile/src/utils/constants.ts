// App constants
export const APP_NAME = 'BiteScout';
export const APP_VERSION = '1.0.0';

// API constants
export const API_BASE_URL = 'http://localhost:3000/api';
export const API_TIMEOUT = 10000;

// Colors
export const COLORS = {
  primary: '#f97316',
  primaryDark: '#ea580c',
  secondary: '#1e293b',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  textLight: '#94a3b8',
  border: '#e2e8f0',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Font sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Font weights
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Screen names
export const SCREENS = {
  HOME: 'Home',
  LOGIN: 'Login',
  REGISTER: 'Register',
  RESTAURANT: 'Restaurant',
  PROFILE: 'Profile',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
} as const; 
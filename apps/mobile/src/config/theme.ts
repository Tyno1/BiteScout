/**
 * Design System Configuration for BiteScout Mobile App
 * Extracted from web app's globals.css and adapted for React Native
 */

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors (Orange theme)
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c', // Main primary
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    
    // Secondary Colors (Indigo)
    secondary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81', // Main secondary
      950: '#1e1b4b',
    },
    
    // Neutral Colors (Zinc)
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    
    // Gray Colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    
    // Semantic Colors
    success: {
      light: '#14ae00',
      dark: '#0e7600',
      foreground: {
        light: '#062700',
        dark: '#f0fdf4',
      },
    },
    
    danger: {
      light: '#ef4444',
      dark: '#dc2626',
      foreground: {
        light: '#fef2f2',
        dark: '#7f1d1d',
      },
    },
    
    warning: {
      light: '#f59e0b',
      dark: '#d97706',
      foreground: {
        light: '#fffbeb',
        dark: '#451a03',
      },
    },
    
    info: {
      light: '#3b82f6',
      dark: '#2563eb',
      foreground: {
        light: '#eff6ff',
        dark: '#1e3a8a',
      },
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: 'Montserrat',
      system: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Spacing
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  
  // Border Radius
  borderRadius: {
    none: 0,
    sm: 2,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.25,
      shadowRadius: 25,
      elevation: 12,
    },
  },
  
  // Component Sizes
  sizes: {
    // Button Heights
    button: {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
    },
    
    // Input Heights
    input: {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
    },
    
    // Icon Sizes
    icon: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
      '3xl': 48,
    },
    
    // Avatar Sizes
    avatar: {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
      '2xl': 64,
      '3xl': 80,
    },
  },
  
  // Breakpoints (for responsive design)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Animation Durations
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
} as const;

// Theme variants for light/dark mode
export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Semantic colors that adapt to theme
    background: theme.colors.gray[100],
    foreground: theme.colors.neutral[950],
    card: '#ffffff',
    cardForeground: theme.colors.neutral[900],
    popover: '#ffffff',
    popoverForeground: theme.colors.neutral[950],
    muted: theme.colors.neutral[200],
    mutedForeground: theme.colors.neutral[700],
    border: theme.colors.primary[800],
    input: theme.colors.gray[200],
    inputForeground: theme.colors.neutral[900],
    ring: theme.colors.primary[600],
    
    // Theme-aware semantic colors (like web app)
    primary: theme.colors.primary[700],        // Main primary for light theme
    primaryForeground: theme.colors.gray[100], // Text on primary
    secondary: theme.colors.secondary[900],    // Main secondary for light theme
    secondaryForeground: theme.colors.gray[100], // Text on secondary
    accent: theme.colors.primary[300],         // Accent color
    accentForeground: theme.colors.primary[50], // Text on accent
    destructive: theme.colors.danger.light,    // Error color
    destructiveForeground: theme.colors.gray[100], // Text on error
    success: theme.colors.success.light,       // Success color
    successForeground: theme.colors.success.foreground.light, // Text on success
    warning: theme.colors.warning.light,       // Warning color
    warningForeground: theme.colors.warning.foreground.light, // Text on warning
    info: theme.colors.info.light,             // Info color
    infoForeground: theme.colors.info.foreground.light, // Text on info
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Semantic colors that adapt to theme
    background: theme.colors.neutral[950],
    foreground: theme.colors.gray[100],
    card: theme.colors.neutral[900],
    cardForeground: theme.colors.gray[300],
    popover: theme.colors.primary[800],
    popoverForeground: theme.colors.primary[100],
    muted: theme.colors.gray[200],
    mutedForeground: theme.colors.neutral[400],
    border: theme.colors.primary[900],
    input: theme.colors.neutral[700],
    inputForeground: theme.colors.neutral[200],
    ring: theme.colors.primary[400],
    
    // Theme-aware semantic colors (like web app)
    primary: theme.colors.primary[500],        // Main primary for dark theme
    primaryForeground: '#000000',              // Text on primary
    secondary: theme.colors.secondary[400],    // Main secondary for dark theme
    secondaryForeground: theme.colors.secondary[950], // Text on secondary
    accent: theme.colors.primary[400],         // Accent color
    accentForeground: theme.colors.primary[50], // Text on accent
    destructive: theme.colors.danger.dark,     // Error color
    destructiveForeground: theme.colors.danger.foreground.dark, // Text on error
    success: theme.colors.success.dark,        // Success color
    successForeground: theme.colors.success.foreground.dark, // Text on success
    warning: theme.colors.warning.dark,        // Warning color
    warningForeground: theme.colors.warning.foreground.dark, // Text on warning
    info: theme.colors.info.dark,              // Info color
    infoForeground: theme.colors.info.foreground.dark, // Text on info
  },
};

// Export type for TypeScript
export type Theme = typeof theme;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;

// Union type for theme variants
export type ThemeVariant = LightTheme | DarkTheme;


import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Appearance } from 'react-native';
import type { ColorSchemeName } from 'react-native';
import { darkTheme, lightTheme } from '../config/theme';
import type { ThemeVariant } from '../config/theme';

interface ThemeContextType {
  theme: ThemeVariant;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export function ThemeProvider({ children, initialTheme = 'system' }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (initialTheme === 'system') {
      return Appearance.getColorScheme() === 'dark';
    }
    return initialTheme === 'dark';
  });

  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
      if (initialTheme === 'system') {
        setIsDark(colorScheme === 'dark');
      }
    });

    return () => subscription?.remove();
  }, [initialTheme]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook to get current theme colors
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

// Hook to get current theme spacing
export function useThemeSpacing() {
  const { theme } = useTheme();
  return theme.spacing;
}

// Hook to get current theme typography
export function useThemeTypography() {
  const { theme } = useTheme();
  return theme.typography;
}

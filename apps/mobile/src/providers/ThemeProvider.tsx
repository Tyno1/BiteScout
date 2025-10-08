import { useColorScheme, vars } from "nativewind";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { View } from "react-native";

interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  isDark: boolean;
  isSystem: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    destructive: string;
    success: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: "light" | "dark" | "system";
}

// Define themes using NativeWind's vars()
const themes = {
  light: vars({
    "--color-primary": "194 65 12", // orange-700
    "--color-primary-foreground": "243 244 246", // gray-100
    "--color-secondary": "49 46 129", // indigo-900
    "--color-secondary-foreground": "243 244 246", // gray-100
    "--color-background": "243 244 246", // gray-100
    "--color-foreground": "9 9 11", // zinc-950
    "--color-white": "243 244 246", // gray-100
    "--color-black": "9 9 11", // zinc-950
    "--color-card": "255 255 255", // white
    "--color-card-foreground": "24 24 27", // zinc-900
    "--color-muted": "228 228 231", // zinc-200
    "--color-muted-foreground": "63 63 70", // zinc-700
    "--color-accent": "253 186 116", // orange-300
    "--color-accent-foreground": "255 247 237", // orange-50
    "--color-destructive": "220 38 38", // red-700
    "--color-destructive-foreground": "243 244 246", // gray-100
    "--color-success": "14 118 0", // custom green
    "--color-success-foreground": "240 253 244", // green-50
    "--color-border": "154 52 18", // orange-800
    "--color-input": "229 231 235", // gray-200
    "--color-input-foreground": "24 24 27", // zinc-900
    "--color-ring": "234 88 12", // orange-600
  }),
  dark: vars({
    "--color-primary": "249 115 22", // orange-500
    "--color-primary-foreground": "0 0 0", // black
    "--color-secondary": "255 242 192", // indigo-300
    "--color-secondary-foreground": "30 27 75", // indigo-950
    "--color-background": "9 9 11", // zinc-950
    "--color-foreground": "243 244 246", // gray-100
    "--color-white": "243 244 246", // gray-100
    "--color-black": "9 9 11", // zinc-950
    "--color-card": "24 24 27", // zinc-900
    "--color-card-foreground": "209 213 219", // gray-300
    "--color-muted": "229 231 235", // gray-200
    "--color-muted-foreground": "161 161 170", // zinc-400
    "--color-accent": "251 146 60", // orange-400
    "--color-accent-foreground": "255 247 237", // orange-50
    "--color-destructive": "239 68 68", // red-500
    "--color-destructive-foreground": "127 29 29", // red-900
    "--color-success": "20 83 45", // green-800
    "--color-success-foreground": "6 39 0", // green-950
    "--color-border": "124 45 18", // orange-900
    "--color-input": "63 63 70", // zinc-700
    "--color-input-foreground": "228 228 231", // zinc-200
    "--color-ring": "251 146 60", // orange-400
  }),
};

export function ThemeProvider({
  children,
  initialTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(initialTheme);
  const { colorScheme } = useColorScheme();

  const isSystem = theme === "system";
  const isDark = isSystem ? colorScheme === "dark" : theme === "dark";
  const currentTheme = isDark ? "dark" : "light";

  const colors = {
    primary: isDark ? "#f97316" : "#c2410c", // orange-500 : orange-700
    secondary: isDark ? "#FFF2C0" : "#6b7280", // cream : gray-500
    background: isDark ? "#09090b" : "#f3f4f6", // zinc-950 : gray-100
    foreground: isDark ? "#f3f4f6" : "#09090b", // gray-100 : zinc-950
    muted: isDark ? "#e5e7eb" : "#e4e4e7", // gray-200 : zinc-200
    mutedForeground: isDark ? "#a1a1aa" : "#3f3f46", // zinc-400 : zinc-700
    accent: isDark ? "#fb923c" : "#fdb574", // orange-400 : orange-300
    destructive: isDark ? "#ef4444" : "#dc2626", // red-500 : red-700
    success: isDark ? "#14532d" : "#0e7600", // green-800 : custom green
    border: isDark ? "#7c2d12" : "#9a3412", // orange-900 : orange-800
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    isSystem,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <View style={themes[currentTheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

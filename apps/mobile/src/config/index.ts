/**
 * Design System Exports
 * Central export point for all theme-related utilities
 */

export { theme, lightTheme, darkTheme } from './theme';
export type { Theme, LightTheme, DarkTheme, ThemeVariant } from './theme';

export { styles } from './styles';

export { ThemeProvider, useTheme, useThemeColors, useThemeSpacing, useThemeTypography } from '../providers/ThemeProvider';

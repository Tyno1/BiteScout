/**
 * Button Component using the Design System
 * Simple dynamic styling with theme provider
 */

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import { styles, useTheme } from '../config';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  variant?: 'solid' | 'outline' | 'plain' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  
  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'danger':
        return theme.colors.destructive;
      case 'success':
        return theme.colors.success;
      case 'neutral':
        return theme.colors.foreground;
      default:
        return theme.colors.primary;
    }
  };
  
  const getColorForeground = () => {
    switch (color) {
      case 'primary':
        return theme.colors.primaryForeground;
      case 'secondary':
        return theme.colors.secondaryForeground;
      case 'danger':
        return theme.colors.destructiveForeground;
      case 'success':
        return theme.colors.successForeground;
      case 'neutral':
        return theme.colors.background;
      default:
        return theme.colors.primaryForeground;
    }
  };
  
  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: theme.spacing[size === 'sm' ? 4 : size === 'lg' ? 8 : size === 'xl' ? 10 : 6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minHeight: theme.sizes.button[size],
    };
    
    // Variant-specific styles
    const variantStyle = (() => {
      const colorValue = getColorValue();
      
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: colorValue,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colorValue,
          };
        case 'plain':
          return {
            backgroundColor: 'transparent',
            paddingHorizontal: theme.spacing[4],
            paddingVertical: theme.spacing[2],
            minHeight: theme.sizes.button.sm,
          };
        case 'glass':
          return {
            backgroundColor: `${colorValue}20`, // 20% opacity
            borderWidth: 1,
            borderColor: `${colorValue}40`, // 40% opacity
          };
        default:
          return {};
      }
    })();
    
    const disabledStyle = disabled ? {
      backgroundColor: theme.colors.muted,
      opacity: 0.6,
    } : {};
    
    const fullWidthStyle = fullWidth ? { width: '100%' as const } : {};
    
    return [baseStyle, variantStyle, disabledStyle, fullWidthStyle, style];
  };
  
  const getTextStyle = () => {
    const baseStyle = {
      fontSize: variant === 'plain' ? theme.typography.fontSize.sm : theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
    };
    
    // Variant-specific text colors
    const variantTextStyle = (() => {
      const colorValue = getColorValue();
      const colorForeground = getColorForeground();
      
      switch (variant) {
        case 'solid':
          return { color: colorForeground };
        case 'outline':
        case 'plain':
          return { color: colorValue };
        case 'glass':
          return { color: colorValue };
        default:
          return {};
      }
    })();
    
    const disabledStyle = disabled ? {
      color: theme.colors.mutedForeground,
    } : {};
    
    return [baseStyle, variantTextStyle, disabledStyle];
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'solid' ? getColorForeground() : getColorValue()} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

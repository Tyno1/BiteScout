/**
 * Simple Style Utilities for BiteScout Mobile App
 * Use with theme provider for dynamic styling
 */

import { theme } from './theme';

// Spacing utilities
export const spacing = {
  // Padding
  p: (value: keyof typeof theme.spacing) => ({ padding: theme.spacing[value] }),
  px: (value: keyof typeof theme.spacing) => ({ paddingHorizontal: theme.spacing[value] }),
  py: (value: keyof typeof theme.spacing) => ({ paddingVertical: theme.spacing[value] }),
  pt: (value: keyof typeof theme.spacing) => ({ paddingTop: theme.spacing[value] }),
  pr: (value: keyof typeof theme.spacing) => ({ paddingRight: theme.spacing[value] }),
  pb: (value: keyof typeof theme.spacing) => ({ paddingBottom: theme.spacing[value] }),
  pl: (value: keyof typeof theme.spacing) => ({ paddingLeft: theme.spacing[value] }),
  
  // Margin
  m: (value: keyof typeof theme.spacing) => ({ margin: theme.spacing[value] }),
  mx: (value: keyof typeof theme.spacing) => ({ marginHorizontal: theme.spacing[value] }),
  my: (value: keyof typeof theme.spacing) => ({ marginVertical: theme.spacing[value] }),
  mt: (value: keyof typeof theme.spacing) => ({ marginTop: theme.spacing[value] }),
  mr: (value: keyof typeof theme.spacing) => ({ marginRight: theme.spacing[value] }),
  mb: (value: keyof typeof theme.spacing) => ({ marginBottom: theme.spacing[value] }),
  ml: (value: keyof typeof theme.spacing) => ({ marginLeft: theme.spacing[value] }),
};

// Flex utilities
export const flex = {
  row: { flexDirection: 'row' as const },
  column: { flexDirection: 'column' as const },
  center: { justifyContent: 'center' as const, alignItems: 'center' as const },
  centerHorizontal: { alignItems: 'center' as const },
  centerVertical: { justifyContent: 'center' as const },
  spaceBetween: { justifyContent: 'space-between' as const },
  spaceAround: { justifyContent: 'space-around' as const },
  spaceEvenly: { justifyContent: 'space-evenly' as const },
  flex1: { flex: 1 },
  flexWrap: { flexWrap: 'wrap' as const },
};

// Export utilities
export const styles = {
  spacing,
  flex,
};

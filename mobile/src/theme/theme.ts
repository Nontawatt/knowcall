/**
 * KnowCall Theme Configuration
 * กำหนดค่า theme สำหรับ React Native Paper
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { colors } from './colors';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.info,
    background: colors.light.background,
    surface: colors.light.surface,
    text: colors.light.textPrimary,
    onSurface: colors.light.textPrimary,
    onBackground: colors.light.textPrimary,
    error: colors.error,
    onError: '#FFFFFF',
    outline: colors.light.divider,

    // Custom colors
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    critical: colors.critical,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6', // Lighter blue สำหรับ dark mode
    primaryContainer: '#1565C0',
    secondary: '#90CAF9',
    background: colors.dark.background,
    surface: colors.dark.surface,
    text: colors.dark.textPrimary,
    onSurface: colors.dark.textPrimary,
    onBackground: colors.dark.textPrimary,
    error: colors.error,
    onError: '#FFFFFF',
    outline: colors.dark.divider,

    // Custom colors
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    critical: colors.critical,
  },
};

export type AppTheme = typeof lightTheme;

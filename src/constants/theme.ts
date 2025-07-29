import type { ThemeMode } from '@ts-types';

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const THEME = {
  LIGHT: THEME_MODE.LIGHT,
  DARK: THEME_MODE.DARK,
} as const;

export const MODE_TOGGLE_MAP: Record<ThemeMode, ThemeMode> = {
  [THEME_MODE.LIGHT]: THEME_MODE.SYSTEM,
  [THEME_MODE.DARK]: THEME_MODE.LIGHT,
  [THEME_MODE.SYSTEM]: THEME_MODE.DARK,
} as const;

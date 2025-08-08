import type { Theme, ThemeMode } from '@ts-types';

export interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
}

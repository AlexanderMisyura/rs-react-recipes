import type { Theme, ThemeMode } from '@ts-types';
import { createContext } from 'react';

export interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

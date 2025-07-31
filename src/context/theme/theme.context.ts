import type { ThemeContextValue } from '@ts-interfaces';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

import { MODE_TOGGLE_MAP, STORAGE_KEY, THEME, THEME_MODE } from '@constants';
import { ThemeContext } from '@context';
import { useBrowserDarkMode, useLocalStorage } from '@hooks';
import { themeModeSchema, themeSchema } from '@schemas';
import type { Theme, ThemeMode } from '@ts-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

function computeTheme(mode: ThemeMode, isBrowserDarkMode: boolean) {
  let theme = mode;

  if (mode === THEME_MODE.SYSTEM) {
    theme = isBrowserDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT;
  }

  return themeSchema.parse(theme);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const isBrowserDarkMode = useBrowserDarkMode();
  const [mode, setMode] = useLocalStorage({
    key: STORAGE_KEY.THEME,
    defaultValue: THEME_MODE.SYSTEM,
  });
  const [theme, setTheme] = useState<Theme>(() =>
    computeTheme(themeModeSchema.parse(mode), isBrowserDarkMode)
  );

  useEffect(() => {
    const currentTheme = computeTheme(themeModeSchema.parse(mode), isBrowserDarkMode);

    if (currentTheme === THEME.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(currentTheme);
  }, [mode, isBrowserDarkMode]);

  const validatedMode = themeModeSchema.parse(mode);

  const toggleMode = useCallback(() => {
    setMode(MODE_TOGGLE_MAP[themeModeSchema.parse(validatedMode)]);
  }, [setMode, validatedMode]);

  const value = useMemo(
    () => ({
      mode: validatedMode,
      theme,
      toggleMode,
    }),
    [theme, validatedMode, toggleMode]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

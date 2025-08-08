import { MODE_TOGGLE_MAP, STORAGE_KEY, THEME_MODE } from '@constants';
import { ThemeContext } from '@context';
import { useBrowserDarkMode, useLocalStorage } from '@hooks';
import { themeModeSchema, themeSchema } from '@schemas';
import { useCallback, useMemo } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const isBrowserDarkMode = useBrowserDarkMode();
  const [mode, setMode] = useLocalStorage({
    key: STORAGE_KEY.THEME,
    defaultValue: THEME_MODE.SYSTEM,
  });

  const currentTheme = useMemo(() => {
    if (mode === THEME_MODE.SYSTEM) {
      return isBrowserDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    }
    return mode;
  }, [mode, isBrowserDarkMode]);

  const validatedMode = themeModeSchema.parse(mode);
  const validatedTheme = themeSchema.parse(currentTheme);

  const toggleMode = useCallback(() => {
    setMode(MODE_TOGGLE_MAP[themeModeSchema.parse(validatedMode)]);
  }, [setMode, validatedMode]);

  const value = useMemo(
    () => ({
      mode: validatedMode,
      theme: validatedTheme,
      toggleMode,
    }),
    [validatedTheme, validatedMode, toggleMode]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

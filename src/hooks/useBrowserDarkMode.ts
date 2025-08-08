import { useEffect, useMemo, useState } from 'react';

export function useBrowserDarkMode() {
  const matchMedia = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)'), []);
  const [isDark, setIsDark] = useState<boolean>(() => matchMedia.matches);

  useEffect(() => {
    const saveBrowserDarkMode = (event: MediaQueryListEvent): void => {
      setIsDark(event.matches);
    };

    matchMedia.addEventListener('change', saveBrowserDarkMode);

    return () => {
      matchMedia.removeEventListener('change', saveBrowserDarkMode);
    };
  }, [matchMedia]);

  return isDark;
}

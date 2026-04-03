'use client';

import { useEffect, useRef, useState } from 'react';

export function useBrowserDarkMode() {
  const matchMediaRef = useRef<MediaQueryList | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    matchMediaRef.current ??= window.matchMedia('(prefers-color-scheme: dark)');

    setIsDark(matchMediaRef.current.matches);
  }, []);

  useEffect(() => {
    matchMediaRef.current ??= window.matchMedia('(prefers-color-scheme: dark)');

    const saveBrowserDarkMode = (event: MediaQueryListEvent): void => {
      setIsDark(event.matches);
    };

    matchMediaRef.current.addEventListener('change', saveBrowserDarkMode);

    return () => {
      matchMediaRef.current?.removeEventListener('change', saveBrowserDarkMode);
    };
  }, []);

  return isDark;
}

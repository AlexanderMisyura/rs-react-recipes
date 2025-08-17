'use client';

import { storageService } from '@services';
import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageOptions {
  key: string;
  primaryValue?: string;
  defaultValue?: string;
}

export const useLocalStorage = ({
  key,
  primaryValue,
  defaultValue = '',
}: UseLocalStorageOptions) => {
  const [value, setValue] = useState(/* () => storageService.getItem(key) ?? */ defaultValue);

  useEffect(() => {
    const storedValue = storageService.getItem(key);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [key]);

  useEffect(() => {
    if (primaryValue !== undefined) {
      setValue(primaryValue);
      storageService.setItem(key, primaryValue);
    }
  }, [key, primaryValue]);

  const saveToStorage = useCallback(
    (newValue: string) => {
      storageService.setItem(key, newValue);
      setValue(newValue);
    },
    [key]
  );

  return [value, saveToStorage] as const;
};

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
  const [value, setValue] = useState(() => storageService.getItem(key) ?? defaultValue);

  useEffect(() => {
    if (primaryValue !== undefined) {
      setValue(primaryValue);
      storageService.setItem(key, primaryValue);
    }
  }, [key, primaryValue]);

  const saveToStorage = useCallback(
    (nextValue: string | ((prevValue: string) => string)) => {
      if (typeof nextValue === 'string') {
        storageService.setItem(key, nextValue);
        setValue(nextValue);
      } else {
        storageService.setItem(key, nextValue(value));
        setValue(nextValue(value));
      }
    },
    [key, value]
  );

  return [value, saveToStorage] as const;
};

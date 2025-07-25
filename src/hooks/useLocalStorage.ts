import { storageService } from '@services';
import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue = '') => {
  const [value, setValue] = useState(() => storageService.getItem(key) ?? defaultValue);

  useEffect(() => {
    storageService.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

import { PARAMS_MAP } from '@constants';
import { storageService } from '@services';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useLocalStorageParamSync = (key: string, defaultValue = '') => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(
    () => searchParams.get(PARAMS_MAP[key]) ?? storageService.getItem(key) ?? defaultValue
  );

  useEffect(() => {
    storageService.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

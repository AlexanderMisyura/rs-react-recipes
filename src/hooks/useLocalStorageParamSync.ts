import { PARAMS_MAP } from '@constants';
import { storageService } from '@services';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useLocalStorageParamSync = (key: string, defaultValue = '') => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(
    () => searchParams.get(PARAMS_MAP[key]) ?? storageService.getItem(key) ?? defaultValue
  );

  const setValueSynchronously = useCallback(
    (newValue: string) => {
      storageService.setItem(key, newValue);
      setValue(newValue);
    },
    [key]
  );

  return [value, setValueSynchronously] as const;
};

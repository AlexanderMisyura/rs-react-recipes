import { PARAMS_MAP } from '@constants';
import { useLocalStorage } from '@hooks';
import { useSearchParams } from 'react-router';

export const useParamToStorageSync = (key: string, defaultValue = '') => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useLocalStorage({
    key,
    primaryValue: searchParams.get(PARAMS_MAP[key]) ?? defaultValue,
  });

  return [value, setValue] as const;
};

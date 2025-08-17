'use client';

import { PARAMS_MAP } from '@constants';
import { useLocalStorage } from '@hooks';
import { usePathname, useRouter } from '@i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useParamToStorageSync = (key: string) => {
  const searchParams = useSearchParams();
  const [value, setValue] = useLocalStorage({ key });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams == null) {
      return;
    }

    const param = searchParams.get(PARAMS_MAP[key]);

    if (param == null && value) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(PARAMS_MAP[key], value);

      router.push(`${pathname}?${newSearchParams}`);
    }
  }, [searchParams, value, key, pathname, router]);

  useEffect(() => {
    const param = searchParams?.get(PARAMS_MAP[key]);

    if (param != null) {
      setValue(param);
    }
  }, [key, setValue, searchParams]);

  return [value, setValue] as const;
};

import { PARAMS_MAP } from '@constants';
import { useLocalStorage } from '@hooks';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export const useParamToStorageSync = (key: string) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useLocalStorage({ key });
  const location = useLocation();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    const param = searchParams.get(PARAMS_MAP[key]);

    if (param === null && value) {
      if (isMounted.current) {
        return;
      }

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(PARAMS_MAP[key], value);
      isMounted.current = true;
      void navigate(`${location.pathname}?${newSearchParams}`, {
        viewTransition: true,
        replace: true,
      });
    }
  }, [searchParams, navigate, value, key, location.pathname]);

  useEffect(() => {
    const param = searchParams.get(PARAMS_MAP[key]);

    if (param !== null) {
      setValue(param);
    }
  }, [key, setValue, searchParams]);

  return [value, setValue] as const;
};

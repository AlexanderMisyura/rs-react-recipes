import { useEffect } from 'react';

export const useFocusOnInput = (ref: React.RefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
};

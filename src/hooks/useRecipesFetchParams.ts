import { getRecipesFetchParams } from '@utils';
import { useSearchParams } from 'next/navigation';

export function useRecipesFetchParams() {
  const searchParams = useSearchParams();

  return getRecipesFetchParams(searchParams);
}

import { Button, Search } from '@components';
import { getRecipesFetchParams } from '@utils';
import { useLocation } from 'react-router';
import { useGetRecipesQuery } from 'redux/apiRecipesSlice';

import { PageContent } from './PageContent/PageContent';

export const MainPage = () => {
  const location = useLocation();
  const recipesParams = getRecipesFetchParams(new URLSearchParams(location.search));
  const {
    refetch,
    data: recipesData,
    isFetching,
    isError,
    error,
  } = useGetRecipesQuery(recipesParams);

  return (
    <>
      <Search />
      <Button onClickHandler={() => void refetch()} disabled={isFetching} className="w-[136px]">
        {isFetching ? 'Fetching...' : 'Refetch'}
      </Button>

      <div
        data-testid="main-page"
        className="flex w-full grow flex-col items-center justify-center gap-4"
      >
        <PageContent
          isFetching={isFetching}
          recipesData={recipesData}
          isError={isError}
          error={error}
        />
      </div>
    </>
  );
};

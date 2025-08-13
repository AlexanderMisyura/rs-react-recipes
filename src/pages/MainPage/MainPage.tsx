import { Button, Search } from '@components';
import { getRecipesFetchParams } from '@utils';
import { useLocation, useNavigation } from 'react-router';
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
  const navigation = useNavigation();

  const isListLoading =
    navigation.state === 'loading' && navigation.location.search !== location.search;

  const isLoading = isListLoading || isFetching;

  return (
    <>
      <Search />
      <Button onClickHandler={() => void refetch()} disabled={isLoading} className="w-[136px]">
        {isFetching ? 'Refetching...' : 'Refetch'}
      </Button>

      <div
        data-testid="main-page"
        className="flex w-full grow flex-col items-center justify-center gap-4"
      >
        <PageContent
          isLoading={isLoading}
          recipesData={recipesData}
          isError={isError}
          error={error}
        />
      </div>
    </>
  );
};

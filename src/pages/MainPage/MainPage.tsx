import { BoxWrapper, Heading, List, Pagination, Search, Spinner } from '@components';
import type { RecipesResponse } from '@ts-types';
import { useLoaderData, useLocation, useNavigation } from 'react-router';

export const MainPage = () => {
  const recipesData = useLoaderData<RecipesResponse>();
  const navigation = useNavigation();
  const location = useLocation();

  const isListLoading =
    navigation.state === 'loading' && navigation.location.search !== location.search;

  return (
    <>
      <Search />

      <div data-testid="main-page" className="flex grow flex-col items-center justify-center gap-4">
        {isListLoading && <Spinner />}

        {!isListLoading && recipesData.recipes.length && (
          <>
            <List recipesData={recipesData} />
            <Pagination total={recipesData.total} />
          </>
        )}

        {!isListLoading && !recipesData.recipes.length && (
          <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
            <Heading>Sorry, No Hot Recipes Found</Heading>
            <p className="text-xl">Try searching for something else</p>
          </BoxWrapper>
        )}
      </div>
    </>
  );
};
